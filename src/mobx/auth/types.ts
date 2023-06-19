export interface ISignInUserBody {
  telegramId: string;
  password: string;
}

export interface IForgotPasswordCheckUser {
  email: string;
}

export interface IConfirmEmail {
  code: string;
  email: string;
}

export interface ISubmitPassword {
  password: string;
  email: string;
}

export interface ICheckUser {
  email: string;
}
