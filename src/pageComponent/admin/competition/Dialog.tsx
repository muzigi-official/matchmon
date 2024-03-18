// import { useState } from 'react';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, IconButton, Typography, InputLabel, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';

import { DatePicker, TimePicker } from '@mui/x-date-pickers';

interface Props {
  open: boolean;
  onClose: () => void;
  // onConfirm: (playerData: DialogData) => void;
}

// interface DialogData {
//   [key: string]: string;
// }

export default function AddDialog(props: Props) {
  const { open, onClose } = props;
  // const [data, setData] = useState<DialogData>({});
  // console.log(data);

  // const handleChange = (key: string, value: string) => {
  //   setData((prev: DialogData) => {
  //     return { ...prev, [key]: value };
  //   });
  // };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      scroll='body'
      PaperProps={{
        style: {
          color: 'black',
        },
      }}
    >
      <DialogTitle id='dialog-title' gap={2} className='dialog-header'>
        <Box display={'flex'} alignContent={'center'}>
          <Box sx={{ flexGrow: 1 }} display={'flex'} alignItems={'center'}>
            <Typography variant='h4' className='header-title'>
              대회 생성
              <Typography variant='body1' className='header-body'>
                대회의 상세정보를 입력하세요.
              </Typography>
            </Typography>
          </Box>
        </Box>
      </DialogTitle>
      <form>
        <DialogContent className='dialog-content'>
          <IconButton onClick={onClose} className='absolute inline-end-4 block-start-4'>
            <CloseIcon />
          </IconButton>
          <Grid container spacing={{ xs: 2 }}>
            <Grid xs={12} sm={12}>
              <TextField required variant='outlined' fullWidth autoComplete='off' label='대회이름' />
            </Grid>
            <Grid xs={12} sm={12}>
              <TextField required variant='outlined' fullWidth autoComplete='off' label='장소(주소)' />
            </Grid>
            <Grid xs={12} sm={6}>
              <DatePicker label='대회 시작 날짜' />
            </Grid>
            <Grid xs={12} sm={6}>
              <TimePicker label='대회 시작 시간' />
              {/* <DateTimePicker label='대회 종료 날짜/시간' /> */}
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField required variant='outlined' fullWidth autoComplete='off' label='팀관리자' />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField required variant='outlined' fullWidth autoComplete='off' label='연락처' />
            </Grid>
            <Grid xs={12}>
              <TextField required variant='outlined' fullWidth label='이메일' />
            </Grid>
            <Grid xs={12} container spacing={1}>
              <Grid xs={12}>
                <InputLabel htmlFor='component-outlined'>유니폼</InputLabel>
              </Grid>
              <Grid xs={4}>
                <TextField required variant='outlined' fullWidth label='상의색' />
              </Grid>
              <Grid xs={4}>
                <TextField required variant='outlined' fullWidth label='하의색' />
              </Grid>
              <Grid xs={4}>
                <TextField required variant='outlined' fullWidth label='스타킹색' />
              </Grid>
            </Grid>
            <Grid xs={12} display='flex' alignItems='center'></Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-footer'>
          <Button variant='contained'>저장</Button>
          <Button variant='outlined' sx={{ borderColor: grey[400], color: grey[400] }} onClick={onClose}>
            취소
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
