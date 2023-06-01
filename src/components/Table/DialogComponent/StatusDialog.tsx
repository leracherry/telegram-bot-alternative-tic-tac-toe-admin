import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { FC } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CircleIcon from '@mui/icons-material/Circle';
import UserStore from '../../../mobx/user';
interface IStatusDialogProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  telegramId: string;
  status: string;
}
const StatusDialog: FC<IStatusDialogProps> = ({
  setOpen,
  open,
  telegramId,
  status,
}) => {
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <VisibilityIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Change status</DialogTitle>
        <DialogContent sx={{ width: '20vw', height: '10vh' }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>telegramId:</Typography>{' '}
            <Typography>{telegramId}</Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography>status:</Typography>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <CircleIcon color={status === 'block' ? 'error' : 'success'} />
              <Typography>{status}</Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            variant={'outlined'}
            color={status === 'active' ? 'error' : 'success'}
            onClick={async () => {
              await UserStore.changeStatus({
                status: status === 'block' ? 'active' : 'block',
                telegramId,
              });
              setOpen(false);
            }}
          >
            {status === 'block' ? 'activate' : 'block'}
          </Button>
          <Button variant={'outlined'} onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default StatusDialog;
