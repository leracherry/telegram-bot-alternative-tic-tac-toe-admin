export interface IGame {
  _id: string;
  firstPlayer: string;
  secondPlayer: string;
  gameType: string;
  moves: IMove[];
  status: string;
  winner: string;
  createdAt: Date
}

export interface IMove {
  row: number,
  col: number,
  figure: 'X' | '0',
  innerRow: number,
  innerCol: number
}

export interface ICreatePostBody {
  title: string;
  link: string;
  description: string;
  pubDate: Date;
}

export interface IUpdatePostBody {
  title: string;
  link: string;
  description: string;
}

export interface IGameFilter {
  page?: string;
  perPage?: string;
  sort?: SortEnum;
  sortBy?: SortNamesEnum;
  search?: string;
  dateFrom?: Date;
  dateTo?: Date;
}

export enum SortNamesEnum {
  firstPlayer = 'firstPlayer',
  secondPlayer = 'secondPlayer',
  gameType = 'gameType',
  status = 'status',
  winner = 'winner',
  createdAt = 'createdAt'
}

export enum SortEnum {
  ASC = 'ASC',
  DESC = 'DESC',
}
