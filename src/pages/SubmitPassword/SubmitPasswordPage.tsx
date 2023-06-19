import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import { LoginSchema, SubmitPasswordSchema } from '../../validation/auth';
import { useTranslation } from 'react-i18next';
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { observer } from 'mobx-react';
import AuthStore from '../../mobx/auth';
import CustomValidationInput from '../../components/Input/CustomValidationInput/CustomValidationInput';
import styles from './SubmitPasswordPage.module.scss';
import { useNavigate } from 'react-router-dom';

function SignInPage() {
  const navigate = useNavigate();
  const {
    loginErrors,
    clearErrors,
    getUserEmail,
    submitWithEmail,
    submitPassword,
  } = AuthStore;
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleClickShowRepeatPassword = () =>
    setShowRepeatPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };
  const handleMouseDownRepeatPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  useEffect(() => {
    getUserEmail(() => navigate('/login'));
  }, []);

  return (
    <Box className={styles.container}>
      <Formik
        initialValues={{
          password: '',
          repeatPassword: '',
        }}
        onSubmit={async (values) => {
          await submitPassword(
            {
              password: values.password,
              email: submitWithEmail ?? '',
            },
            () => navigate('/login'),
          );
        }}
        validationSchema={SubmitPasswordSchema}
      >
        {({ handleSubmit }) => {
          return (
            <Box className={styles.formik_container}>
              <Typography
                className={styles.formik_container__title}
                variant={'h3'}
              >
                {t('Login.SubmitPassword')}
              </Typography>
              <CustomValidationInput
                type={!showPassword ? 'text' : 'password'}
                clearErrors={clearErrors}
                errors={loginErrors}
                width={400}
                formControlProps={{ sx: { mb: 2 } }}
                endAdornment={() => (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                label={t('Login.PasswordLabel')}
                fieldName={'password'}
              />
              <CustomValidationInput
                type={!showPassword ? 'text' : 'password'}
                clearErrors={clearErrors}
                errors={loginErrors}
                width={400}
                formControlProps={{ sx: { mb: 2 } }}
                endAdornment={() => (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowRepeatPassword}
                      onMouseDown={handleMouseDownRepeatPassword}
                      edge="end"
                    >
                      {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )}
                label={t('Login.RepeatPasswordLabel')}
                fieldName={'repeatPassword'}
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
                {t('Login.SavePassword').toUpperCase()}
              </Button>
            </Box>
          );
        }}
      </Formik>
    </Box>
  );
}

export default observer(SignInPage);
