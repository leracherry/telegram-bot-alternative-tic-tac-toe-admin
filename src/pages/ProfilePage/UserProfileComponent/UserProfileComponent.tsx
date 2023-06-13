import React, { FC, useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { Formik } from 'formik';
import { ChangeProfileSchema } from '../../../validation/profile';
import CustomValidationInput from '../../../components/Input/CustomValidationInput/CustomValidationInput';
import moment from 'moment';
import { IChangeProfile, IUser } from '../../../mobx/user/types';
import { IRequestError } from '../../../types';
import styles from './UserProfileComponent.module.scss';
import { useTranslation } from 'react-i18next';
interface IUserProfileComponentProps {
  user: IUser;
}
const UserProfileComponent: FC<IUserProfileComponentProps> = ({ user }) => {
  const { t } = useTranslation();

  console.log(user.name);

  return (
    <Box>
      <Box className={styles.header_container}>
        <Typography variant={'h4'}>{t('Profile.Title')}</Typography>
      </Box>
      <Box>
        <Box>
          <Typography>
            {t('Profile.Name')}: {user.name}
          </Typography>
          <Typography>
            {t('Login.TelegramIdLabel')}: {user.id}
          </Typography>
          <Typography>
            {t('Profile.CreatedAt')}:{moment(user.createdAt).format('DD.MM.YY')}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default UserProfileComponent;
