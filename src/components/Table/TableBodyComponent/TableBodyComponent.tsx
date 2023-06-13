import { FC, useState } from 'react';
import TableCell from '@mui/material/TableCell';
import Checkbox from '@mui/material/Checkbox';
import * as React from 'react';
import moment from 'moment';
import styles from './TableBodyComponent.module.scss';
import { ITableHeaderProps } from '../../../types';
import DialogComponent from '../DialogComponent/DialogComponent';
import CircleIcon from '@mui/icons-material/Circle';
import { Box, Typography } from '@mui/material';
import StatusDialog from '../DialogComponent/StatusDialog';

interface ITableBodyProps {
  row: any;
  selected: any;
  setSelected: (value: any) => void;
  index: number;
  header: ITableHeaderProps;
  labelId: string;
  isItemSelected: boolean;
}

const TableBodyComponent: FC<ITableBodyProps> = ({
  row,
  header,
  labelId,
  isItemSelected,
}) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TableCell padding="checkbox">
        <Checkbox
          color="primary"
          checked={isItemSelected}
          inputProps={{
            'aria-labelledby': labelId,
          }}
        />
      </TableCell>
      {Object.keys(row).map((key, index) => {
        const data = header[key]?.isDate
          ? moment(row[key]).format('DD.MM.YYYY hh:ss')
          : row[key];

        if (header[key]?.isStatus) {
          return (
            <TableCell
              className={styles.cell}
              key={`${row.createdAt}-${index}`}
              align="right"
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                }}
              >
                <CircleIcon color={data === 'block' ? 'error' : 'success'} />
                <Typography sx={{ color: data === 'block' ? 'red' : 'green' }}>
                  {data}
                </Typography>
                {row.role !== 'admin' && (
                  <StatusDialog
                    status={data}
                    open={open}
                    setOpen={setOpen}
                    telegramId={row.id}
                  />
                )}
              </Box>
            </TableCell>
          );
        }

        if (header[key]?.isAction && header[key]?.isJson) {
          return (
            <TableCell
              className={styles.cell}
              key={`${row.createdAt}-${index}`}
              align="right"
            >
              <DialogComponent
                data={data}
                label={key}
                open={open}
                setOpen={setOpen}
              />
            </TableCell>
          );
        }

        if (key !== '_id') {
          return (
            <TableCell
              className={styles.cell}
              key={`${row.createdAt}-${index}`}
              align="right"
            >
              {data}
            </TableCell>
          );
        }
        return null;
      })}
    </>
  );
};
export default TableBodyComponent;
