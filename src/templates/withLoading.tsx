import React from 'react';
import GameStore from '../mobx/game';
import UserStore from '../mobx/user';
import AuthStore from '../mobx/auth';
import Spinner from '../components/Spinner/Spinner';

const withLoading = (Component: React.FC) => {
  return () => (
    <>
      {GameStore.loading && <Spinner />}
      {UserStore.loading && <Spinner />}
      {UserStore.usersLoading && <Spinner />}
      {AuthStore.loading && <Spinner />}
      <Component />
    </>
  );
};

export default withLoading;
