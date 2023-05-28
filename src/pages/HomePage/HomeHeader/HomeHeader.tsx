import React, { FC } from 'react';
import { Box } from '@mui/material';
import TableToolbar from '../../../components/Table/TableToolbar/TableToolbar';
import styles from './HomeHeader.module.scss';
import { IGameFilter } from '../../../mobx/game/types';
import SearchGame from '../SearchGame/SearchGame';

interface IPostHeaderProps {
  getGames: (filters: IGameFilter) => void;
  filters: IGameFilter;
  removeList: (ids: string[]) => void;
  selected: string[];
  setSelected: (selected: string[]) => void;
}
const PostHeader: FC<IPostHeaderProps> = ({
  getGames,
  filters,
  removeList,
  selected,
  setSelected,
}) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.container__flex}>
        <SearchGame
          filters={filters}
          getPosts={getGames}
          setSelected={setSelected}
        />
      </Box>
      <TableToolbar removeList={removeList} selected={selected} />
    </Box>
  );
};
export default PostHeader;
