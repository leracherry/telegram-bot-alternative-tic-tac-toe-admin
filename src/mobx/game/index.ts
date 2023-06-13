import { makeAutoObservable } from 'mobx';
import { IGame, IGameFilter, SortEnum, SortNamesEnum } from './types';
import GameServices from '../../services/game.services';
import { createQuery } from '../../utils';
import { toast } from 'react-toastify';

class GameStore {
  games: IGame[] = [];
  loading = false;
  filters: IGameFilter = {
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

  getGames = async (filters: IGameFilter) => {
    try {
      this.loading = true;
      const { games, count } = await GameServices.getGames(filters);
      this.games = games;
      this.count = count;

      this.setFilters(filters);
      this.loading = false;
    } catch (e: any) {
      this.games = [];
      this.loading = false;
      toast.error(e.response.data.error, { autoClose: 2000 });
    }
  };

  setFilters = (filters: IGameFilter) => {
    const newUrl = `${window.location.pathname}${createQuery(filters)}`;
    window.history.pushState(null, '', newUrl);

    this.filters = filters;
  };

  removeList = async (ids: string[]) => {
    try {
      this.loading = true;

      await GameServices.removeGamesList(ids, this.games);
      await this.getGames(this.filters);
      this.setSelected([]);

      this.loading = false;
      toast.success('Games removed success', { autoClose: 2000 });
    } catch (e: any) {
      toast.error(e.response.data.error, { autoClose: 2000 });
      this.loading = false;
    }
  };

  setSelected = (selected: string[]) => {
    this.selected = selected;
  };
}

export default new GameStore();
