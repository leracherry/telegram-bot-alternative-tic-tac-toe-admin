import { makeAutoObservable } from 'mobx';
import {
  IChangePasswordBody,
  IUser,
  IUserFilter,
  SortEnum,
  SortNamesEnum,
} from './types';
import UserServices from '../../services/user.services';
import AuthStore from '../auth';
import { IRequestError } from '../../types';
import { createQuery } from '../../utils';

class UserStore {
  user?: IUser;
  users: IUser[] = [];
  loading = false;
  usersLoading = false;
  changePasswordErrors?: IRequestError;
  filters: IUserFilter = {
    page: '0',
    perPage: '10',
    sortBy: SortNamesEnum.createdAt,
    sort: SortEnum.DESC,
    search: '',
    dateFrom: undefined,
    dateTo: undefined,
  };
  selected: string[] = [];
  count = 0;
  constructor() {
    makeAutoObservable(this, {}, {});
  }

  getUsers = async (filters: IUserFilter) => {
    try {
      this.usersLoading = true;
      const { users, count } = await UserServices.getUsers(filters);
      this.users = users;
      this.count = count;

      this.setFilters(filters);
      this.usersLoading = false;
    } catch (e) {
      this.users = [];
    }
  };

  getProfile = async () => {
    try {
      this.loading = true;
      this.user = await UserServices.getProfile();
      this.loading = false;
    } catch (e: any) {
      this.loading = false;
      AuthStore.logoutUser();
    }
  };

  changePassword = async (body: IChangePasswordBody) => {
    try {
      this.loading = true;
      await UserServices.changePassword(body);
      this.loading = false;
    } catch (e: any) {
      this.loading = false;
      if (e.response.data.user) {
        AuthStore.logoutUser();
        document.location.reload();
      }
      this.changePasswordErrors = e.response.data;
    }
  };

  clearErrors = () => {
    this.changePasswordErrors = undefined;
  };

  setFilters = (filters: IUserFilter) => {
    const newUrl = `${window.location.pathname}${createQuery(filters)}`;
    window.history.pushState(null, '', newUrl);

    this.filters = filters;
  };

  removeList = async (ids: string[]) => {
    this.loading = true;

    await UserServices.removeUsersList(ids);
    await this.getUsers(this.filters);
    this.setSelected([]);

    this.loading = false;
  };

  setSelected = (selected: string[]) => {
    this.selected = selected;
  };
}

export default new UserStore();
