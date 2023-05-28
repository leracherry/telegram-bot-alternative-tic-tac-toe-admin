import { ISignInUserBody } from '../mobx/auth/types';
import axios from 'axios';

class AuthServices {
  private baseUrl = `${process.env.REACT_APP_API_URL}/auth`;

  async signInUser(body: ISignInUserBody) {
    return axios.post(`${this.baseUrl}/login`, body).then((res) => {
      return res.data;
    });
  }
}

export default new AuthServices();
