import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import { FC, useEffect, useState } from 'react';
import TableHeader from '../TableHeader/TableHeader';
import CustomInput from '../../Input/CustomInput/CustomInput';
import TableBodyComponent from '../TableBodyComponent/TableBodyComponent';
import { TableRow, Typography } from '@mui/material';
import { ITableHeaderProps } from '../../../types';
import styles from './TableComponent.module.scss';
import { useTranslation } from 'react-i18next';

interface ITableComponentProps {
  rows: any[];
  header: ITableHeaderProps;
  filters: { [key: string]: any };
  fetchData: (filters: { [key: string]: any }) => void;
  count: number;
  removeList: (ids: string[]) => void;
  selected: string[];
  setSelected: (value: string[]) => void;
  actions?: (row: any) => void;
}

const TableComponent: FC<ITableComponentProps> = ({
  rows,
  header,
  filters,
  fetchData,
  count,
  selected,
  setSelected,
}) => {
  const { t } = useTranslation();
  rows = rows.map((item) => {
    const _item = item;
    delete _item.updated_at;
    delete _item.__v;
    return _item;
  });
  const [pageInput, setPageInput] = useState('0');

  const isSelected = (link: string) => {
    return selected.indexOf(link) !== -1;
  };

  const handleClickRow = (event: React.MouseEvent<unknown>, _id: string) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = async (page: number) => {
    const newFilters = {
      ...filters,
      page: page.toString(),
    };
    await fetchData(newFilters);
  };

  const handleChangeRowsPerPage = async (event: any) => {
    const newFilters = {
      ...filters,
      perPage: event.target.value.toString(),
    };
    await fetchData(newFilters);
  };

  useEffect(() => {
    setPageInput(filters.page);
  }, [filters.page]);

  return (
    <Box className={styles.container} sx={{ bgcolor: 'background.paper' }}>
      {rows.length > 0 && (
        <TableContainer className={styles.container__table}>
          <Table
            className={styles.container__table}
            aria-labelledby="tableTitle"
            size={'medium'}
          >
            <TableHeader
              numSelected={selected.length}
              rowCount={rows.length}
              onSelectAllClick={handleSelectAllClick}
              header={header}
              filters={filters}
              fetchData={fetchData}
            />
            <TableBody>
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.createdAt);
                const labelId = `enhanced-table-checkbox-${index}`;
                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClickRow(event, row.createdAt)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.createdAt}
                    selected={isItemSelected}
                    className={styles.row}
                  >
                    <TableBodyComponent
                      isItemSelected={isItemSelected}
                      labelId={labelId}
                      header={header}
                      row={row}
                      selected={selected}
                      setSelected={setSelected}
                      index={index}
                    />
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
      {rows.length === 0 && (
        <Box className={styles.container__no_data}>
          <Typography>No data found</Typography>
        </Box>
      )}
      <Box
        className={styles.container__pagination}
        sx={{
          pointerEvents: selected.length === 1 ? 'none' : 'auto',
        }}
      >
        <CustomInput
          className={styles.container__pagination__input}
          value={pageInput}
          label={t('Games.Page')}
          changeHandler={(e) => setPageInput(e.target.value)}
          handleSubmit={() => handleChangePage(Number(pageInput))}
        />
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={count}
          labelRowsPerPage={t('Games.RowsPerPage')}
          rowsPerPage={Number(filters.perPage)}
          page={Number(filters.page)}
          onPageChange={(event, newPage) => handleChangePage(newPage)}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Box>
    </Box>
  );
};

export default TableComponent;
