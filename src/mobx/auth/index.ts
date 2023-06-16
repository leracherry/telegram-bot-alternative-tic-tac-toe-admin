import { makeAutoObservable } from 'mobx';
import {
  ICheckUser,
  IConfirmEmail,
  IForgotPasswordCheckUser,
  ISignInUserBody,
  ISubmitPassword,
} from './types';
import AuthServices from '../../services/auth.services';
import { IRequestError } from '../../types';
import TokenService from '../../services/token.service';
import { toast } from 'react-toastify';

class AuthStore {
  accessToken: string | null = TokenService.getToken();
  passwordToken: string | null = TokenService.getPasswordToken();
  submitWithEmail?: string;
  loading = false;
  loginErrors?: IRequestError;
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  signInUser = async (body: ISignInUserBody) => {
    try {
      this.loading = true;
      const { accessToken } = await AuthServices.signInUser(body);

      this.accessToken = accessToken;
      TokenService.setToken(accessToken);
      this.loading = false;
      toast.success('Login success', { autoClose: 2000 });
    } catch (e: any) {
      toast.error(e.response.data.error, { autoClose: 2000 });
      this.loading = false;
    }
  };

  forgotPasswordCheckUser = async (
    body: IForgotPasswordCheckUser,
    cb: () => void,
  ) => {
    try {
      this.loading = true;
      const data = await AuthServices.forgotPasswordCheckUser(body);
      this.loading = false;

      if (
        data.message &&
        data.message === 'Confirmation code already sent to your email'
      ) {
        toast.warning(data.message, { autoClose: 2000 });
      } else {
        toast.success(data.message, { autoClose: 2000 });
      }
      cb();
    } catch (e: any) {
      toast.error(e.response.data.error, { autoClose: 2000 });
      this.loading = false;
    }
  };

  confirmEmail = async (body: IConfirmEmail, cb: () => void) => {
    try {
      this.loading = true;
      const { message, token } = await AuthServices.confirmEmail(body);

      TokenService.setPasswordToken(token);
      this.passwordToken = token;

      toast.success(message, { autoClose: 2000 });

      cb();

      this.loading = false;
    } catch (e: any) {
      toast.error(e.response.data.error, { autoClose: 2000 });
      this.loading = false;
    }
  };

  submitPassword = async (body: ISubmitPassword, cb: () => void) => {
    try {
      this.loading = true;
      const { message } = await AuthServices.createPassword(body);

      TokenService.removeToken();
      this.passwordToken = null;

      toast.success(message, { autoClose: 2000 });

      cb();

      this.loading = false;
    } catch (e: any) {
      toast.error(e.response.data.error, { autoClose: 2000 });
      this.loading = false;
    }
  };

  checkUser = async (body: ICheckUser, cb: () => void) => {
    try {
      this.loading = true;
      await AuthServices.checkUser(body);

      this.loading = false;
    } catch (e: any) {
      cb();
      toast.error(e.response.data.error, { autoClose: 2000 });
      this.loading = false;
    }
  };

  logoutUser = () => {
    this.accessToken = null;
    TokenService.removeToken();
  };

  getUserEmail = async (cb: () => void) => {
    try {
      this.loading = true;
      const { email } = await AuthServices.getUserEmail(this.passwordToken);
      this.submitWithEmail = email;
      this.loading = false;
    } catch (e: any) {
      cb();
      this.loading = false;
    }
  };

  clearErrors = () => {
    this.loginErrors = undefined;
  };
}

export default new AuthStore();
