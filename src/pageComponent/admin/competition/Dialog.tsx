import Button from '@/components/common/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import dayjs from 'dayjs';
import { addCompetition } from '@/api/competition';

import * as S from '@/components/common/dialog/Dialog.style';

interface IFormInput {
  name: string;
  address: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
  organizer: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
  // onConfirm: (playerData: DialogData) => void;
}

export default function AddDialog(props: Props) {
  const {
    register,
    watch,
    formState: { errors },
    control,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    await addCompetition(data);
  };

  const { open, onClose } = props;

  // rules 정리
  // 필수값: 대회이름, 대회 장소, 대회 날짜(시작, 종료), 관리자 연락처
  // 대회 날짜: 종료날짜가 시작날짜보다 더 먼저일 수 없다. 둘이 같을 순 있다.
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
              <label>대회 시작 날짜</label>
              <Controller
                name='startDate'
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
                        disablePast
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
              {errors.startDate?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.startDate.message}
                </p>
              )}
            </Grid>

            <Grid xs={12} sm={12}>
              <label>대회 종료 날짜</label>
              <Controller
                name='endDate'
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
                      <DatePicker
                        disablePast
                        value={value || ''}
                        inputRef={ref}
                        onChange={onChange}
                        onAccept={onChange}
                        shouldDisableDate={day => {
                          return dayjs(dayjs(day).format(`YYYY-MM-DD`)).isBefore(
                            dayjs(watch('startDate')).subtract(1, 'day'),
                          );
                        }}
                        slotProps={{
                          textField: {
                            size: 'small',
                            ...register('endDate', { required: '종료 날짜는 필수값입니다.' }),
                          },
                        }}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                )}
              />
              {errors.endDate?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.endDate.message}
                </p>
              )}
            </Grid>
            {/* TODO: 당일 경기일 경우 체크박스 표시 두기 */}
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
