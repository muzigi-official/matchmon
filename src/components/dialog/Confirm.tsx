import Button from '@/components/common/Button';
import Dialog from '@mui/material/Dialog';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import { Box, Typography } from '@mui/material';

import * as S from './Confirm.style';

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
      <S.DialogContent aria-labelledby='dialog-content'>
        <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <ErrorOutlineOutlinedIcon color='warning' sx={{ fontSize: 88, marginBlockEnd: '1rem' }} />
          <Box sx={{ flexGrow: 1 }} alignItems={'center'} gap={5}>
            <Typography variant='body2'>{content}</Typography>
          </Box>
        </Box>
      </S.DialogContent>
      <S.DialogFooter>
        <Button variant='contained' onClick={onConfirm} autoFocus>
          Yes
        </Button>
        <Button variant='outlined' color='cancel' onClick={onClose}>
          Cancel
        </Button>
      </S.DialogFooter>
    </Dialog>
  );
}
