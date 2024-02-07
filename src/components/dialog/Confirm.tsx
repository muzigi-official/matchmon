import * as React from 'react';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Typography } from '@mui/material';

import './confirm.scoped.css';
//FIXME:: css scoped 안되는 문제가 있음

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
        <Button variant='outlined' sx={{ borderColor: grey[400], color: grey[400] }} onClick={onClose}>
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
}
