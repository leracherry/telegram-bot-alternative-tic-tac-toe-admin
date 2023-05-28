import { makeAutoObservable } from 'mobx';
import { IGame, IGameFilter, SortEnum, SortNamesEnum } from './types';
import GameServices from '../../services/game.services';
import { createQuery } from '../../utils';

class GameStore {
  games: IGame[] = [];
  loading = false;
  gameLoading = false;
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
      console.log(games);
      this.games = games;
      this.count = count;

      this.setFilters(filters);
      this.loading = false;
    } catch (e) {
      this.games = [];
    }
  };

  setFilters = (filters: IGameFilter) => {
    const newUrl = `${window.location.pathname}${createQuery(filters)}`;
    window.history.pushState(null, '', newUrl);

    this.filters = filters;
  };

  removeList = async (ids: string[]) => {
    this.loading = true;

    await GameServices.removeGamesList(ids);
    await this.getGames(this.filters);
    this.setSelected([]);

    this.loading = false;
  };

  setSelected = (selected: string[]) => {
    this.selected = selected;
  };
}

export default new GameStore();
