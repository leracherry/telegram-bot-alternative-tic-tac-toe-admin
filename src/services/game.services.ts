import axios from 'axios';
import {
   IGame, IGameFilter,
} from '../mobx/game/types';
import { createQuery } from '../utils';
import TokenService from './token.service';

class GameServices {
  private baseUrl = `${process.env.REACT_APP_API_URL}/game`;

  async getGames(
    filters: IGameFilter
  ): Promise<{ games: IGame[]; count: number }> {
    return axios
      .get(this.baseUrl + createQuery(filters), {
        headers: TokenService.getHeaders(),
      })
      .then((res) => {
        return res.data;
      });
  }

  async removePostList(ids: string[]) {
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

export default new GameServices();
