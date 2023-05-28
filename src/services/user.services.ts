import axios from 'axios';
import { IChangePasswordBody, IUser, IUserFilter } from '../mobx/user/types';
import TokenService from './token.service';
import { createQuery } from '../utils';

class UserServices {
  private baseUrl = `${process.env.REACT_APP_API_URL}/user`;

  async getUsers(
    filters: IUserFilter,
  ): Promise<{ users: IUser[]; count: number }> {
    return axios
      .get(this.baseUrl + '/list' + createQuery(filters), {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }
  async getProfile() {
    return axios
      .get(this.baseUrl, {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }

  async changePassword(body: IChangePasswordBody) {
    return axios
      .put(this.baseUrl + '/change-password', body, {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }

  async removeUsersList(ids: string[]) {
    return axios
      .delete(this.baseUrl + '/list', {
        params: { ids: ids.join(',') },
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }
}

export default new UserServices();
