import { Box, Button, createStyles, makeStyles, Modal, TextField, Theme } from '@material-ui/core'
import React from 'react'
import { SubmitHandler, useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import firebase, { db } from "../../../firebase";
import { queryTime } from "../../../recoil/selector";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: "absolute",
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalForm: {
      display: "flex",
      flexWrap: "wrap",
    },
  })
);

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

interface IFormInput {
  name: string;
}

interface Props {
  open: boolean,
  handleClose: VoidFunction,
}
const MapAddDialog = ({ open, handleClose }: Props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const setQueryTime = useSetRecoilState(queryTime);
  const { register, handleSubmit, setError, formState: {errors}, reset } = useForm<IFormInput>();


  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    if (!data.name || data.name.length <= 0) {
      setError("name", {
        type: "requred",
        message: "名前の入力は必須です"
      });
      return;
    }

    db.collection("maps").where("name", "==", data.name)
      .get()
      .then((querySnapshot) => {
        console.log("querySnapshot", querySnapshot.size, querySnapshot.empty);
        if (querySnapshot.empty){
          // 同名のデータが見つからなかったら追加する

          const docId = db.collection("maps").doc().id;
          db.collection("maps").doc(docId).set({
            docId: docId,
            name: data.name,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          });


          // ダイアログを閉じる
          handleClose();

          // mapListを更新するための時刻更新
          const nowTime:string = new Date().toISOString();
          setQueryTime(nowTime);

          // フォームの内容をリセット
          reset();
        } else {
          setError("name", {
            type: "alreadyexists",
            message: "この名前は既に使用されています"
          });
        }
      });
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <div style={modalStyle} className={classes.paper}>
        <h2 id="simple-modal-title">スキルマップを追加する</h2>
        <p id="simple-modal-description">半角英数、ハイフンが使用できます.</p>
        <form
          className={classes.modalForm}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete="off"
        >

          <TextField
            fullWidth
            {...register('name')}
            error={Boolean(errors.name)}
            helperText={errors.name && errors.name.message}
          />

          <Box m={2}>
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              追加する
            </Button>
          </Box>
        </form>
      </div>
    </Modal>
  )
}

export default MapAddDialog
