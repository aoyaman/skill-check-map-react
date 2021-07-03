import { Box, Button, createStyles, makeStyles, Modal, Theme } from '@material-ui/core';
import React from 'react';
import { useSetRecoilState } from 'recoil';
import { db } from "../../../firebase";
import { queryTime } from "../../../recoil/selector";
import { SkillMap } from "../../../types/skillmap";


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


interface Props {
  map: SkillMap|null,
  open: boolean,
  handleClose: VoidFunction,
}
const MapDelDialog = ({ map, open, handleClose }: Props) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const setQueryTime = useSetRecoilState(queryTime);

  const handleDelete = () => {
    if (map == null) {
      console.error('handleDelete : map is null');
      return;
    }
    db.collection("maps").doc(map.id).delete().then(() => {
        console.log("Document successfully deleted!");

        // mapListを更新するための時刻更新
        const nowTime:string = new Date().toISOString();
        setQueryTime(nowTime);

        // ダイアログを閉じる
        handleClose();
    }).catch((error) => {
        console.error("Error removing document: ", error);
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
        <h2 id="simple-modal-title">{map ? map.name : ''}を削除して本当によろしいですか？</h2>
        <Box m={2}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleDelete}
          >
            削除する
          </Button>
        </Box>
      </div>
    </Modal>
  )
}

export default MapDelDialog
