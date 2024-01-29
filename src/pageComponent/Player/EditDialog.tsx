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

import AgeSelector from './AgeSelector';

interface Props {
  player: PlayerData;
  open: boolean;
  onClose: () => void;
  onConfirm: (playerData: PlayerData) => void;
}

export default function EditDialog(props: Props) {
  const { player, open, onClose, onConfirm } = props;
  const [modifiedPlayer, setModifiedPlayer] = useState<PlayerData>(player);

  const handleChange = (key: string, value: string) => {
    setModifiedPlayer((prev: PlayerData) => {
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
              value={modifiedPlayer['이름']}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                handleChange('이름', event.target.value);
              }}
            />
          </Grid>
          <Grid xs={5} sx={borderStyle}>
            <Box alignItems={'center'} justifyContent={'center'} display={'flex'}>
              <img src={modifiedPlayer['프사']} loading='lazy' width={60} height={60} />
            </Box>
          </Grid>
          <Grid xs={12} sx={borderStyle}>
            <AgeSelector
              onChange={value => {
                handleChange('연령대', value);
              }}
              defaultValue={modifiedPlayer['연령대']}
            />
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
                value={modifiedPlayer['성별']}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange('성별', event.target.value);
                }}
              >
                <FormControlLabel value='female' control={<Radio />} label='Female' />
                <FormControlLabel value='male' control={<Radio />} label='Male' />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid xs={3} display='flex' alignItems='center' sx={borderStyle}>
            <Typography sx={{ textAlign: 'center' }}>선출여부</Typography>
          </Grid>
          <Grid xs={9} sx={borderStyle}>
            <FormControl>
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
            </FormControl>
          </Grid>
          <Grid xs={12} sx={borderStyle}>
            플레이 스타일
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>취소</Button>
        <Button onClick={() => onConfirm(modifiedPlayer)}>수정</Button>
      </DialogActions>
    </Dialog>
  );
}
