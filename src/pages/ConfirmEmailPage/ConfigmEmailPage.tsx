import React, { FC, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { observer } from 'mobx-react';
import styles from './ConfirmEmailPage.module.scss';
import { Formik } from 'formik';
import { ConfirmEmailSchema } from '../../validation/auth';
import { Button, Typography } from '@mui/material';
import CustomValidationInput from '../../components/Input/CustomValidationInput/CustomValidationInput';
import { useTranslation } from 'react-i18next';
import AuthStore from '../../mobx/auth';
import { useNavigate, useParams } from 'react-router-dom';

const ConfirmEmailPage: FC = () => {
  const { email } = useParams<{ email: string }>();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { loginErrors, clearErrors, confirmEmail, checkUser } = AuthStore;
  const checkUserHandler = async () => {
    await checkUser({ email: email || '' }, () => navigate('/submit-password'));
  };

  useEffect(() => {
    checkUserHandler().then();
  }, [email]);
  return (
    <Box className={styles.container}>
      <Formik
        initialValues={{
          code: '',
        }}
        onSubmit={async (values) => {
          await confirmEmail({ code: values.code, email: email || '' }, () =>
            navigate('/submit-password'),
          );
        }}
        validationSchema={ConfirmEmailSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Box className={styles.formik_container}>
              <Typography
                className={styles.formik_container__title}
                variant={'h3'}
              >
                {t('Login.ConfirmCode')}
              </Typography>
              <CustomValidationInput
                clearErrors={clearErrors}
                errors={loginErrors}
                width={400}
                formControlProps={{ sx: { mb: 2 } }}
                label={t('Login.Code')}
                fieldName={'code'}
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
                {t('Login.Confirm').toUpperCase()}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
};

export default observer(ConfirmEmailPage);
