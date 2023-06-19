import {
  ICheckUser,
  IConfirmEmail,
  IForgotPasswordCheckUser,
  ISignInUserBody,
  ISubmitPassword,
} from '../mobx/auth/types';
import axios from 'axios';

class AuthServices {
  private baseUrl = `${process.env.REACT_APP_API_URL}/auth`;

  async signInUser(body: ISignInUserBody) {
    return axios.post(`${this.baseUrl}/login`, body).then((res) => {
      return res.data;
    });
  }

  async forgotPasswordCheckUser(body: IForgotPasswordCheckUser) {
    return axios
      .post(`${this.baseUrl}/forgot-password-check`, body)
      .then((res) => {
        return res.data;
      });
  }
  async confirmEmail(body: IConfirmEmail) {
    return axios.post(`${this.baseUrl}/confirm-email`, body).then((res) => {
      return res.data;
    });
  }

  async createPassword(body: ISubmitPassword) {
    return axios.post(`${this.baseUrl}/create-password`, body).then((res) => {
      return res.data;
    });
  }
  async checkUser(body: ICheckUser) {
    return axios.post(`${this.baseUrl}/check-user`, body).then((res) => {
      return res.data;
    });
  }

  async getUserEmail(passwordToken: string | null) {
    return axios
      .get(`${this.baseUrl}/user-email`, {
        headers: {
          passwordToken,
        },
      })
      .then((res) => {
        return res.data;
      });
  }
}

export default new AuthServices();
