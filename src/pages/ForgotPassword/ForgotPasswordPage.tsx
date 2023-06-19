import React, { FC } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import styles from './ForgotPasswordPage.module.scss';
import { Formik } from 'formik';
import { ForgotPasswordSchema } from '../../validation/auth';
import { Button, Typography } from '@mui/material';
import CustomValidationInput from '../../components/Input/CustomValidationInput/CustomValidationInput';
import { useTranslation } from 'react-i18next';
import AuthStore from '../../mobx/auth';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordPage: FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { loginErrors, clearErrors, forgotPasswordCheckUser } = AuthStore;

  return (
    <Box className={styles.container}>
      <Formik
        initialValues={{
          email: '',
        }}
        onSubmit={async (values) => {
          await forgotPasswordCheckUser(values, () =>
            navigate(`/confirm-email/${values.email}`),
          );
        }}
        validationSchema={ForgotPasswordSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Box className={styles.formik_container}>
              <Typography
                className={styles.formik_container__title}
                variant={'h3'}
              >
                {t('Login.PasswordRecovering')}
              </Typography>
              <CustomValidationInput
                clearErrors={clearErrors}
                errors={loginErrors}
                width={400}
                formControlProps={{ sx: { mb: 2 } }}
                label={t('Login.Email')}
                fieldName={'email'}
              />
              <Button
                className={styles.formik_container__submit_btn}
                fullWidth
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit();
                  }
                }}
                variant={'contained'}
                onClick={() => {
                  handleSubmit();
                }}
              >
                {t('Login.SendMail').toUpperCase()}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default observer(ForgotPasswordPage);
