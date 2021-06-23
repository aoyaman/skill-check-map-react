import { Box, Button, Modal, TextField } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { TextFields } from "@material-ui/icons";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";
import React from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import firebase, { db } from "../../../firebase";
import { mapsQuery, queryTime } from "../../../recoil/selector";
import { SkillMap } from "../../../types/skillmap";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      maxWidth: 752,
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    title: {
      margin: theme.spacing(4, 0, 2),
    },
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

export default function InteractiveList() {
  const classes = useStyles();
  const mapList: SkillMap[] = useRecoilValue(mapsQuery);
  const setQueryTime = useSetRecoilState(queryTime);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { register, handleSubmit, setError, formState: {errors}, reset } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);

    if (data.name.length <= 0) {
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
          setOpen(false);

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

  const modalBody = (
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

        <Button
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginLeft: 8 }}
        >
          追加する
        </Button>
      </form>
    </div>
  );

  return (
    <div className={classes.root}>
      <Typography variant="h6" className={classes.title}>
        Skill maps
      </Typography>
      <div className={classes.demo}>
        <List>
          {mapList.map((skillmap) => (
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={skillmap.name} />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Box textAlign="center" p={1}>
          <Button variant="contained" color="primary" onClick={handleOpen}>
            追加する
          </Button>
        </Box>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {modalBody}
      </Modal>
    </div>
  );
}
