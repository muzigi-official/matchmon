import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Box, IconButton, TextField, Typography, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ko';

interface Props {
  player: Player;
  open: boolean;
  onClose: () => void;
  onConfirm: (player: Player) => void;
}

export default function EditDialog(props: Props) {
  const { player, open, onClose, onConfirm } = props;
  const [modifiedPlayer, setModifiedPlayer] = useState<Player>(player);
  // const [value, setValue] = useState<Dayjs | null>(player.birth ? dayjs(player.birth) : null); //YYYY-MM-DD

  const handleChange = (key: string, value: string) => {
    setModifiedPlayer((prev: Player) => {
      return { ...prev, [key]: value };
    });
  };

  const borderStyle = { borderBottom: 'solid 1px blue' };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
      <DialogTitle id='dialog-title'>
        <Box display={'flex'} alignContent={'center'}>
          <Box sx={{ flexGrow: 1 }} display={'flex'} alignItems={'center'}>
            <Typography variant='h6'>선수 수정</Typography>
          </Box>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid xs={3} display='flex' alignItems='center' sx={borderStyle}>
            <Typography sx={{ textAlign: 'center' }}>선수이름</Typography>
          </Grid>
          <Grid xs={4} sx={borderStyle}>
            <TextField
              value={modifiedPlayer.name}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange('name', event.target.value);
              }}
            />
          </Grid>
          <Grid xs={5} sx={borderStyle}>
            <Box alignItems={'center'} justifyContent={'center'} display={'flex'}>
              <img src={modifiedPlayer.picture} loading='lazy' width={60} height={60} />
            </Box>
          </Grid>
          <Grid xs={12} sx={borderStyle}>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='ko'>
              <DatePicker
                label='생일을 입력해주세요'
                value={dayjs(player.birth)}
                onChange={(value: Dayjs | null) => {
                  if (value) {
                    handleChange('birth', value.format('YYYY-MM-DD'));
                  }
                }}
              />
            </LocalizationProvider>
          </Grid>
          <Grid xs={3} display='flex' alignItems='center' sx={borderStyle}>
            <Typography sx={{ textAlign: 'center' }}>성별</Typography>
          </Grid>
          <Grid xs={9} sx={borderStyle}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={modifiedPlayer.gender}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange('gender', event.target.value);
                }}
              >
                <FormControlLabel value='female' control={<Radio />} label='여성' />
                <FormControlLabel value='male' control={<Radio />} label='남성' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={3} display='flex' alignItems='center' sx={borderStyle}>
            <Typography sx={{ textAlign: 'center' }}>선출여부</Typography>
          </Grid>
          <Grid xs={9} sx={borderStyle}>
            {/* <FormControl>
              <RadioGroup
                row
                aria-labelledby='demo-row-radio-buttons-group-label'
                name='row-radio-buttons-group'
                value={modifiedPlayer['선출여부']}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange('선출여부', event.target.value);
                }}
              >
                <FormControlLabel value='O' control={<Radio />} label='O' />
                <FormControlLabel value='X' control={<Radio />} label='X' />
              </RadioGroup>
            </FormControl> */}
          </Grid>
          <Grid xs={12} sx={borderStyle}>
            플레이 스타일
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button variant='outlined' onClick={onClose}>
          취소
        </Button>
        <Button variant='contained' onClick={() => onConfirm(modifiedPlayer)}>
          수정
        </Button>
      </DialogActions>
    </Dialog>
  );
}
