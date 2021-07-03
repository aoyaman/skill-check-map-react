import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

type Props = {
  posts: string[];
  title: string;
}

const Main: React.FC<Props> = ({  title }) => {

  return (
    <Grid item xs={12} md={8}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Divider />
    </Grid>
  );
};

export default Main;
