import { Box, Button } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import DeleteIcon from "@material-ui/icons/Delete";
import FolderIcon from "@material-ui/icons/Folder";
import React from "react";
import { useRecoilValue } from "recoil";
import { mapsQuery } from "../../../recoil/selector";
import { SkillMap } from "../../../types/skillmap";
import MapAddDialog from "./MapAddDialog";
import MapDelDialog from "./MapDelDialog";


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




export default function InteractiveList() {
  const classes = useStyles();
  const mapList: SkillMap[] = useRecoilValue(mapsQuery);

  // 追加ダイアログ用
  const [isOpenAdd, setOpenAdd] = React.useState(false);
  const handleOpenAdd = () => {
    setOpenAdd(true);
  };
  const handleCloseAdd = () => {
    setOpenAdd(false);
  };

  // 削除ダイアログ用
  const [isOpenDel, setOpenDel] = React.useState(false);
  const [delMap, setDelMap] = React.useState<SkillMap|null>(null);
  const handleOpenDel= (skillmap: SkillMap) => {
    setDelMap(skillmap);
    setOpenDel(true);
  };
  const handleCloseDel = () => {
    setOpenDel(false);
  };

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
                <IconButton edge="end" aria-label="delete" onClick={() => handleOpenDel(skillmap)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
        <Box textAlign="center" p={1}>
          <Button variant="contained" color="primary" onClick={handleOpenAdd}>
            追加する
          </Button>
        </Box>
      </div>
      <MapAddDialog open={isOpenAdd} handleClose={handleCloseAdd} />
      <MapDelDialog open={isOpenDel} map={delMap} handleClose={handleCloseDel} />
    </div>
  );
}
