import { makeAutoObservable } from 'mobx';
import { ISignInUserBody } from './types';
import AuthServices from '../../services/auth.services';
import { IRequestError } from '../../types';
import TokenService from '../../services/token.service';
import { toast } from 'react-toastify';

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

      console.log(accessToken);
      this.accessToken = accessToken;
      TokenService.setToken(accessToken);
      this.loading = false;
      toast.success('Login success', { autoClose: 2000 });
    } catch (e: any) {
      toast.error(e.response.data.error, { autoClose: 2000 });
      this.loading = false;
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
