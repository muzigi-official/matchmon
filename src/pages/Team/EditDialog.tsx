import { useState } from 'react';
import { grey } from '@mui/material/colors';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, IconButton, FormLabel, Typography, InputLabel, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import BasicSelect from '@/components/select/BasicSelect';

import { LOCATION_INFO, TEAM_TYPE_INFO } from '@/constant/DefaultSetting';
import './editDialog.scoped.css';

interface Props {
  data: DialogData;
  open: boolean;
  onClose: () => void;
  onConfirm: (playerData: DialogData) => void;
}
const selectLocation = LOCATION_INFO;
const selectTeamType = TEAM_TYPE_INFO;

export default function EditDialog(props: Props) {
  const { data, open, onClose, onConfirm } = props;
  const [modifiedData, setModifiedData] = useState<DialogData>(data);

  const handleChange = (key: string, value: string) => {
    setModifiedData((prev: DialogData) => {
      console.log(key, value);
      return { ...prev, [key]: value };
    });
  };

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
              Edit User Information
              <Typography variant='body1' className='header-body'>
                Updating team details will receive a privacy audit.
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
            <Grid xs={12} sm={6} display='flex' alignItems='center'>
              <BasicSelect
                title={selectTeamType.title}
                items={selectTeamType.items}
                defaultValue={modifiedData['teamType']}
                onSelect={value => {
                  handleChange('teamType', value);
                }}
              ></BasicSelect>
            </Grid>
            <Grid xs={12} sm={6} display='flex' alignItems='center'>
              <FormControl fullWidth>
                <FormLabel>성별</FormLabel>
                <RadioGroup
                  row
                  aria-labelledby='demo-row-radio-buttons-group-label'
                  name='row-radio-buttons-group'
                  value={modifiedData['gender']}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange('gender', event.target.value);
                  }}
                >
                  <FormControlLabel value='F' control={<Radio />} label='여성' />
                  <FormControlLabel value='M' control={<Radio />} label='남성' />
                  <FormControlLabel value='A' control={<Radio />} label='혼성' />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                required
                variant='outlined'
                fullWidth
                label='팀 명'
                value={modifiedData['name']}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange('name', event.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <FormControl fullWidth>
                <BasicSelect
                  title={selectLocation.title}
                  items={selectLocation.items}
                  defaultValue={modifiedData['location']}
                  onSelect={value => {
                    handleChange('location', value);
                  }}
                ></BasicSelect>
              </FormControl>
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                required
                variant='outlined'
                fullWidth
                autoComplete='off'
                label='팀관리자'
                value={modifiedData['managerName']}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange('managerName', event.target.value);
                }}
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                required
                variant='outlined'
                fullWidth
                label='연락처'
                value={modifiedData['phone']}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  handleChange('phone', event.target.value);
                }}
              />
            </Grid>
            <Grid xs={12}>
              <TextField required disabled variant='outlined' fullWidth label='이메일' value={modifiedData['email']} />
            </Grid>
            <Grid xs={12} container spacing={1}>
              <Grid xs={12}>
                <InputLabel htmlFor='component-outlined'>유니폼</InputLabel>
              </Grid>
              <Grid xs={4}>
                <TextField
                  required
                  variant='outlined'
                  fullWidth
                  label='상의색'
                  value={modifiedData['uniformTop']}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange('uniformTop', event.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  required
                  variant='outlined'
                  fullWidth
                  label='하의색'
                  value={modifiedData['uniformBottom']}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange('uniformBottom', event.target.value);
                  }}
                />
              </Grid>
              <Grid xs={4}>
                <TextField
                  required
                  variant='outlined'
                  fullWidth
                  label='스타킹색'
                  value={modifiedData['uniformSocks']}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    handleChange('uniformSocks', event.target.value);
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions className='dialog-footer'>
          <Button variant='contained' onClick={() => onConfirm(modifiedData)}>
            저장
          </Button>
          <Button variant='outlined' sx={{ borderColor: grey[400], color: grey[400] }} onClick={onClose}>
            취소
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
