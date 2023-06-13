import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import TableComponent from '../../components/Table/TableComponent/TableComponent';
import { ITableHeaderProps } from '../../types';
import { useTranslation } from 'react-i18next';
import GameStore from '../../mobx/game';
import { IGameFilter } from '../../mobx/game/types';
import { formatGames } from '../../utils';
import HomeHeader from './HomeHeader/HomeHeader';
import withSidebar from '../../templates/withSidebar';

const HomePage: FC = (): React.JSX.Element => {
  const {
    count,
    games,
    filters,
    selected,
    getGames,
    removeList,
    setFilters,
    setSelected,
    loading,
  } = GameStore;
  const { t } = useTranslation();
  const headers: ITableHeaderProps = {
    firstPlayer: { name: t('Games.FirstPlayer'), sort: true },
    secondPlayer: { name: t('Games.SecondPlayer') },
    gameType: { name: t('Games.GameType'), sort: true },
    moves: { name: t('Games.Moves'), sort: true, isAction: true, isJson: true },
    status: { name: t('Games.Status'), sort: true },
    winner: { name: t('Games.Winner'), sort: true },
    createdAt: { name: t('Games.CreatedAt'), sort: true, isDate: true },
  };

  useEffect(() => {
    let queryList = window.location.href.split('?');
    const result: IGameFilter = {};

    if (queryList.length > 1) {
      queryList = queryList[1].split('&');

      queryList.forEach((item) => {
        const key = item.split('=')[0];
        // @ts-ignore
        result[key] = item.split('=')[1];
      });

      setFilters(result);
      getGames(result).then();
    } else {
      getGames(filters).then();
    }
  }, []);
  return (
    <>
      <HomeHeader
        getGames={getGames}
        filters={filters}
        removeList={removeList}
        selected={selected}
        setSelected={setSelected}
      />
      <TableComponent
        loading={loading}
        rows={formatGames(games)}
        count={count}
        header={headers}
        filters={filters}
        selected={selected}
        fetchData={getGames}
        removeList={removeList}
        setSelected={setSelected}
      />
    </>
  );
};

export default withSidebar(observer(HomePage));
