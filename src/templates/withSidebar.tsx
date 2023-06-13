import React from 'react';
import Grid from '@mui/material/Grid';
import Sidebar from '../components/Sidebar/Sidebar';

const withSidebar = (Component: React.FC) => {
  return () => (
    <Grid container columnSpacing={2}>
      <Grid item xs={2}>
        <Sidebar />
      </Grid>
      <Grid item xs={10}>
        <Component />
      </Grid>
    </Grid>
  );
};

export default withSidebar;
