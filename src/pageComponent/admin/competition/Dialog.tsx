import { useEffect } from 'react';
import dayjs from 'dayjs';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@/components/common/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';

import DateRangePicker from '@/components/common/DateTimePicker/range/DateRangePicker';

import * as S from '@/components/common/dialog/Dialog.style';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: (competition: ICompetitionFormInput) => void;
}

export default function AddDialog({ open, onClose, onConfirm }: Props) {
  const {
    register,
    reset,
    watch,
    formState: { errors },
    control,
    handleSubmit,
    setValue,
  } = useForm<ICompetitionFormInput>();

  const onSubmit: SubmitHandler<ICompetitionFormInput> = async formData => {
    await onConfirm(formData);
  };

  useEffect(() => {
    const now = dayjs().toDate(); // 오늘 날짜를 기본값으로 설정
    reset({
      name: '',
      address: '',
      phoneNumber: '',
      startDate: now,
      endDate: now,
      organizer: '',
    });
  }, [open, reset]);

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
      <S.DialogHeader id='dialog-title'>
        <S.DialogHeaderTitle variant='h4'>
          대회 생성
          <S.DialogHeaderBody variant='body1'>대회의 상세정보를 입력하세요.</S.DialogHeaderBody>
        </S.DialogHeaderTitle>
      </S.DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.DialogContent>
          <S.DialogCloseButton onClick={onClose} className='dialog-close-button'>
            <CloseIcon />
          </S.DialogCloseButton>
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
              <label>대회 날짜</label>
              <Controller
                name='startDate'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '대회 날짜는 필수값입니다.',
                  },
                }}
                render={({ field }) => (
                  <DateRangePicker
                    startValue={field.value} // 전달된 value를 사용
                    endValue={watch('endDate')} // endDate의 값을 watch로 가져옴
                    onChange={(startDate: Date, endDate: Date) => {
                      setValue('startDate', startDate);
                      setValue('endDate', endDate);
                    }}
                  />
                )}
              />
              {errors.startDate?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.startDate.message}
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
              <input {...register('organizer')} />
            </Grid>
          </Grid>
        </S.DialogContent>
        <S.DialogFooter>
          <Button type='submit' variant='contained'>
            저장
          </Button>
          <Button variant='outlined' onClick={onClose}>
            취소
          </Button>
        </S.DialogFooter>
      </form>
    </Dialog>
  );
}
