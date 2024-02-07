import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Typography } from '@mui/material';

import './confirm.scoped.css';

interface Props {
  title: string;
  content: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmDialog(props: Props) {
  const { content, open, onClose, onConfirm } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth='xs'
      aria-labelledby='dialog-title'
      aria-describedby='dialog-description'
    >
      <DialogContent aria-labelledby='dialog-content' className='dialog-content'>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <ErrorOutlineOutlinedIcon color='warning' sx={{ fontSize: 88, marginBlockEnd: '1rem' }} />
          <Box sx={{ flexGrow: 1 }} alignItems={'center'} gap={5}>
            <Typography variant='body2'>{content}</Typography>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions className='dialog-footer'>
        <Button variant='contained' onClick={onConfirm} autoFocus>
          Yes
        </Button>
        <Button variant='outlined' onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
