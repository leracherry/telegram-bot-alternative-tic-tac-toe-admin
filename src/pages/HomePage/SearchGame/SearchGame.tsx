import React, { FC, useCallback, useEffect, useState } from 'react';
import { debounce } from 'lodash';
import { InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { IGameFilter } from '../../../mobx/game/types';
import CustomInput from '../../../components/Input/CustomInput/CustomInput';

interface ISearchPostProps {
  filters: IGameFilter;
  getGames: (filters: IGameFilter) => void;
  setSelected: (selected: string[]) => void;
}

const SearchGame: FC<ISearchPostProps> = ({
  getGames,
  filters,
  setSelected,
}) => {
  const { t } = useTranslation();
  const [search, setSearch] = useState<string>(filters.search || '');
  const handleInput = useCallback(
    debounce((value: string) => {
      const newFilters = {
        ...filters,
        search: value || undefined,
      };
      getGames(newFilters);
    }, 500),
    [],
  );

  useEffect(() => {
    setSearch(filters.search || '');
  }, [filters.search]);

  return (
    <CustomInput
      endAdornment={
        <InputAdornment position="end">
          <SearchIcon />
        </InputAdornment>
      }
      value={search}
      label={t('Games.Search')}
      changeHandler={(e) => {
        setSelected([]);
        setSearch(e.target.value);
        handleInput(e.target.value);
      }}
    />
  );
};

export default SearchGame;
