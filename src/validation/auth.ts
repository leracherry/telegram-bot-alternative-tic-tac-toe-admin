import * as Yup from 'yup';

export const LoginSchema = Yup.object().shape({
  telegramId: Yup.string().lowercase().trim().required('Required'),

  password: Yup.string()
    .min(6, 'Min6')
    .max(30, 'Max30')
    .trim()
    .required('Required'),
});

export const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email().lowercase().trim().required('Required'),
});

export const ConfirmEmailSchema = Yup.object().shape({
  code: Yup.string().lowercase().trim().required('Required'),
});

export const SubmitPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, 'Min8')
    .max(30, 'Max30')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
      'StrongPassword',
    )
    .trim()
    .required('Required'),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'PasswordsMustMatch')
    .required('Required'),
});
