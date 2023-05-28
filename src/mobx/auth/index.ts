import { makeAutoObservable } from 'mobx';
import { ISignInUserBody } from './types';
import AuthServices from '../../services/auth.services';
import { IRequestError } from '../../types';
import TokenService from '../../services/token.service';

class AuthStore {
  accessToken: string | null = TokenService.getToken();
  loading = false;
  loginErrors?: IRequestError;
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  signInUser = async (body: ISignInUserBody) => {
    try {
      this.loading = true;
      const { accessToken } = await AuthServices.signInUser(body);

      console.log(accessToken)
      this.accessToken = accessToken;
      TokenService.setToken(accessToken);
      this.loading = false;
    } catch (e: any) {
      console.log(e.response.data);
      // this.loading = false;
      // if (e.response.data.user) {
      //   this.logoutUser();
      //   document.location.reload();
      // } else if (e.response.data.details) {
      //   this.loginErrors = { email: 'EmailMustBeAValidEmail' };
      // } else {
      //   console.log(e);
      //   this.loginErrors = e.response.data;
      // }
    }
  };

  logoutUser = () => {
    this.accessToken = null;
    TokenService.removeToken();
  };

  clearErrors = () => {
    this.loginErrors = undefined;
  };
}

export default new AuthStore();
