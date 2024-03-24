// import { useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import { IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

interface IFormInput {
  name: string;
  address: string;
  phoneNumber: string;
  startDatetime: Date;
  endDatetime: Date;
  hostCompany: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  // onConfirm: (playerData: DialogData) => void;
}

export default function AddDialog(props: Props) {
  const {
    register,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    console.log('submit');
    console.log(data);
  };

  const { open, onClose } = props;

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
      <div id='dialog-title' className='dialog-header'>
        <Typography variant='h4' className='header-title'>
          대회 생성
          <Typography variant='body1' className='header-body'>
            대회의 상세정보를 입력하세요.
          </Typography>
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='dialog-content'>
          <IconButton onClick={onClose} className='dialog-close-button'>
            <CloseIcon />
          </IconButton>
          <label>대회 이름</label>
          <input
            {...register('name', { required: true })}
            autoComplete='off'
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name?.type === 'required' && (
            <p className='error' role='alert'>
              대회 이름은 필수 값 입니다.
            </p>
          )}
          <label>장소(주소)</label>
          <input
            {...register('address', { required: '주소는 필수값입니다.' })}
            aria-invalid={errors.address ? 'true' : 'false'}
          />
          {errors.address && (
            <p className='error' role='alert'>
              {errors.address.message}
            </p>
          )}
          <Grid container spacing={{ xs: 2 }}>
            <Grid xs={12} sm={12}>
              <label>대회 시작 날짜</label>
              <Controller
                name='startDatetime'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '대회 시작 날짜는 필수값 입니다.',
                  },
                }}
                render={({ field: { value, onChange, ref } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker
                        value={value || ''}
                        inputRef={ref}
                        onChange={onChange}
                        onAccept={onChange}
                        slotProps={{
                          textField: {
                            size: 'small',
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />
              {errors.startDatetime?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.startDatetime.message}
                </p>
              )}
            </Grid>

            <Grid xs={12} sm={12}>
              <label>대회 종료 날짜</label>
              <Controller
                name='endDatetime'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '대회 종료 날짜는 필수값 입니다.',
                  },
                }}
                render={({ field: { value, onChange, ref } }) => (
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DemoContainer components={['DateTimePicker']}>
                      <DateTimePicker
                        value={value || ''}
                        inputRef={ref}
                        onChange={onChange}
                        onAccept={onChange}
                        slotProps={{
                          textField: {
                            size: 'small',
                            ...register('endDatetime', { required: '종료 날짜는 필수값입니다.' }),
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />
              {errors.endDatetime?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.endDatetime.message}
                </p>
              )}
            </Grid>
            <Grid xs={12} sm={6}>
              <label>관리자 연락처</label>
              <input
                {...register('phoneNumber', { required: '관리자 번호는 필수 값입니다.' })}
                aria-invalid={errors.phoneNumber ? 'true' : 'false'}
              />
              {errors.phoneNumber?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.phoneNumber.message}
                </p>
              )}
            </Grid>
            <Grid xs={12} sm={6}>
              <label>대회 주관사</label>
              <input {...register('hostCompany')} />
            </Grid>
          </Grid>
        </div>
        <div className='dialog-footer'>
          <Button type='submit' variant='contained'>
            저장
          </Button>
          <Button variant='outlined' onClick={onClose}>
            취소
          </Button>
        </div>
      </form>
    </Dialog>
  );
}
