import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
} from '@mui/material';
import { observer } from 'mobx-react';
import * as React from 'react';
import { FC } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import AceEditor from 'react-ace';
interface IDialogComponentProps {
  label: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  data: string;
}
const DialogComponent: FC<IDialogComponentProps> = ({
  label,
  setOpen,
  open,
  data,
}) => {
  return (
    <>
      <IconButton onClick={() => setOpen(true)}>
        <VisibilityIcon />
      </IconButton>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>{label}.json</DialogTitle>
        <DialogContent>
          <AceEditor
            style={{ overflowX: 'hidden' }}
            mode="json"
            theme="twilight"
            name="json-editor"
            value={JSON.stringify(data, null, 2)}
            readOnly={false}
            width="20vw"
            height="70vh"
            fontSize={14}
          />
        </DialogContent>
        <DialogActions>
          <Button variant={'outlined'} onClick={() => setOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DialogComponent;
