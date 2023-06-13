import { FC } from 'react';
import { Skeleton } from '@mui/material';

const TableSkeleton: FC = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
        <Skeleton
          sx={{ marginTop: '1px' }}
          key={`table-skeleton-${item}`}
          variant="rectangular"
          width={'100%'}
          height={80}
        />
      ))}
    </>
  );
};

export default TableSkeleton;
