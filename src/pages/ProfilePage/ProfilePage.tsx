import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import { Box } from '@mui/material';
import UserStore from '../../mobx/user';
import UserProfileComponent from './UserProfileComponent/UserProfileComponent';
import ChangePassword from './ChangePassword/ChangePassword';
import styles from './ProfilePage.module.scss';
import withSidebar from '../../templates/withSidebar';

const ProfilePage: FC = () => {
  const {
    getProfile,
    user,
    changePassword,
    changePasswordErrors,
    clearErrors,
  } = UserStore;

  useEffect(() => {
    getProfile().then();
  }, []);
  return (
    <>
      <Box className={styles.container} sx={{ bgcolor: 'background.paper' }}>
        {user && (
          <Box className={styles.user}>
            <UserProfileComponent user={user} />
            <ChangePassword
              changePassword={changePassword}
              clearErrors={clearErrors}
              changePasswordErrors={changePasswordErrors}
            />
          </Box>
        )}
      </Box>
    </>
  );
};

export default withSidebar(observer(ProfilePage));
