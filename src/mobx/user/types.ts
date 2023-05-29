export interface IUser {
  name: string;
  role: UserRoleEnum;
  id: string;
  gameType: string;
  createdAt: Date;
  status: string;
}

export interface IUserFilter {
  page?: string;
  perPage?: string;
  sort?: SortEnum;
  sortBy?: SortNamesEnum;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}
export enum UserRoleEnum {
  user = 'user',
  admin = 'admin',
}

export enum SortNamesEnum {
  name = 'name',
  role = 'role',
  id = 'id',
  gameType = 'gameType',
  createdAt = 'createdAt',
}

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}

export interface IChangePasswordBody {
  oldPassword: string;
  newPassword: string;
}

export interface IChangeStatusBody {
  status: string;
  telegramId: string;
}

export interface IChangeProfile {
  name: string;
  email: string;
}
