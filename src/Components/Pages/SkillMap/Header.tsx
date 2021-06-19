import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import {Link as LinkUi }from '@material-ui/core';
import { SkillMap } from './index';
import { useRouteMatch, Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
}));


type Props = {
  maps: SkillMap[],
  title: string;
};

const Header: React.FC<Props> = ({maps, title}) => {
  const classes = useStyles();
  let match = useRouteMatch();

  return (
    <React.Fragment>
      <Toolbar className={classes.toolbar}>
        <Button size="small">Subscribe</Button>
        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          className={classes.toolbarTitle}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        <Button variant="outlined" size="small">
          Sign up
        </Button>
      </Toolbar>
      <Toolbar component="nav" variant="dense" className={classes.toolbarSecondary}>
        {maps.map((skillmap) => (
          <Link to={`${match.url}/${skillmap.name}`}>
            <LinkUi
              color="inherit"
              noWrap
              key={skillmap.id}
              variant="body2"
              className={classes.toolbarLink}
            >
              {skillmap.name}
            </LinkUi>
          </Link>
        ))}
      </Toolbar>
    </React.Fragment>
  );
};

export default Header;
