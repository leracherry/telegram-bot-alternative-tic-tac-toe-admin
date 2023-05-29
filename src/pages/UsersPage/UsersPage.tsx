import React, { FC, useEffect } from 'react';
import { observer } from 'mobx-react';
import TableComponent from '../../components/Table/TableComponent/TableComponent';
import { useTranslation } from 'react-i18next';
import { ITableHeaderProps } from '../../types';
import UserStore from '../../mobx/user';
import UsersHeader from './UsersHeader/UsersHeader';
import { IUserFilter } from '../../mobx/user/types';
import withSidebar from '../../templates/withSidebar';
import { formatUsers } from '../../utils';
import withLoading from '../../templates/withLoading';

const UsersPage: FC = () => {
  const {
    count,
    users,
    filters,
    selected,
    getUsers,
    removeList,
    setFilters,
    setSelected,
    usersLoading,
  } = UserStore;
  const { t } = useTranslation();
  const headers: ITableHeaderProps = {
    name: { name: t('Users.Name'), sort: true },
    role: { name: t('Users.Role'), sort: true },
    status: { name: t('Users.Status'), sort: true, isStatus: true },
    id: { name: t('Users.Id'), sort: true },
    gameType: { name: t('Users.GameType'), sort: true },
    createdAt: { name: t('Users.CreatedAt'), sort: true },
  };

  useEffect(() => {
    let queryList = window.location.href.split('?');
    const result: IUserFilter = {};

    if (queryList.length > 1) {
      queryList = queryList[1].split('&');

      queryList.forEach((item) => {
        const key = item.split('=')[0];
        // @ts-ignore
        result[key] = item.split('=')[1];
      });

      setFilters(result);
      getUsers(result).then();
    } else {
      getUsers(filters).then();
    }
  }, []);

  return (
    <>
      <UsersHeader
        getUsers={getUsers}
        filters={filters}
        removeList={removeList}
        selected={selected}
        setSelected={setSelected}
      />
      <TableComponent
        loading={usersLoading}
        rows={formatUsers(users)}
        count={count}
        header={headers}
        filters={filters}
        selected={selected}
        fetchData={getUsers}
        removeList={removeList}
        setSelected={setSelected}
      />
    </>
  );
};

export default withLoading(withSidebar(observer(UsersPage)));
