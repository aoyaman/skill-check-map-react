import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FolderIcon from "@material-ui/icons/Folder";
import DeleteIcon from "@material-ui/icons/Delete";

import { SkillMap } from "../../../types/skillmap";
import { mapsQuery } from "../../../recoil/selector";
import { useRecoilValue } from "recoil";
import { Box, Button, Modal, TextField } from "@material-ui/core";

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
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
    modalForm: {
      display: 'flex',
      flexWrap: 'wrap',
    },
  })
);

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    })
  );
}
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


export default function InteractiveList() {
  const classes = useStyles();
  const mapList: SkillMap[] = useRecoilValue(mapsQuery);

  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalBody = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">スキルマップを追加する</h2>
      <p id="simple-modal-description">
        半角英数、ハイフンが使用できます.
      </p>
      <form className={classes.modalForm} noValidate autoComplete="off">
        <TextField id="skill-map-name" label="" />
        <Button variant="contained" color="primary"　style={{ marginLeft: 8 }} onClick={handleClose}>
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
              <ListItemText primary="Single-line item" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
          {generate(
            <ListItem button>
              <ListItemAvatar>
                <Avatar>
                  <FolderIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary="Single-line item" />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          )}
        </List>
        <Box textAlign="center" p={1}>
          <Button variant="contained" color="primary"　onClick={handleOpen}>
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
