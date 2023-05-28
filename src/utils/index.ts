import {IGame} from "../mobx/game/types";

export const createQuery = (data: any) => {
  let result = '';
  if (!data || !Object.keys(data).length) {
    return '';
  } else {
    Object.keys(data).map((key) => {
      if (result === '' && data[key] !== undefined && data[key] !== '') {
        result += `?${key}=${data[key]}`;
      } else if (result !== '' && data[key] !== undefined && data[key] !== '') {
        result += `&${key}=${data[key]}`;
      }
    });
  }

  return result;
};

export const formatGames = (games: IGame[]) => {
  return games.map(game => ({
    firstPlayer: game.firstPlayer,
    secondPlayer: game.secondPlayer,
    gameType: game.gameType,
    moves: JSON.stringify(game.moves),
    status: game.status,
    winner: game.winner,
    createdAt: game.createdAt,
  }))
}