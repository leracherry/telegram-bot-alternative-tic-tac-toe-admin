import React, { FC } from 'react';
import { Box } from '@mui/material';
import TableToolbar from '../../../components/Table/TableToolbar/TableToolbar';
import styles from './UsersHeader.module.scss';
import { IGameFilter } from '../../../mobx/game/types';
import SearchUser from '../SearchUser/SearchUser';
import { IUserFilter } from '../../../mobx/user/types';

interface IPostHeaderProps {
  getUsers: (filters: IUserFilter) => void;
  filters: IUserFilter;
  removeList: (ids: string[]) => void;
  selected: string[];
  setSelected: (selected: string[]) => void;
}
const PostHeader: FC<IPostHeaderProps> = ({
  getUsers,
  filters,
  removeList,
  selected,
  setSelected,
}) => {
  return (
    <Box className={styles.container}>
      <Box className={styles.container__flex}>
        <SearchUser
          filters={filters}
          getUsers={getUsers}
          setSelected={setSelected}
        />
      </Box>
      <TableToolbar removeList={removeList} selected={selected} />
    </Box>
  );
};
export default PostHeader;
