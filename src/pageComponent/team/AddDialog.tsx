import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

import BasicSelect from '@/components/select/BasicSelect';
import { LOCATION_INFO } from '@/constant/DefaultSetting';
import { addTeam } from '@/api/team';

import * as S from '@/components/dialog/Dialog.style';

interface IFormInput {
  name: string;
  gender: string;
  location: string;
}

interface Props {
  open: boolean;
  onClose: () => void;
}

const selectLocation = LOCATION_INFO;

export default function AddDialog({ open, onClose }: Props) {
  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = async data => {
    const body = {
      ...data,
      emblem: '',
    };
    const { statusText } = await addTeam(body);

    if (statusText === 'Created') {
      alert('팀 추가 성공');
      onClose();
    }
    reset({ name: '', location: '', gender: '' });
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
      <S.DialogHeader id='dialog-title'>
        <S.DialogHeaderTitle variant='h4'>
          팀 생성
          <S.DialogHeaderBody variant='body1'>팀의 상세정보를 입력하세요.</S.DialogHeaderBody>
        </S.DialogHeaderTitle>
      </S.DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <S.DialogContent>
          <S.DialogCloseButton onClick={onClose} className='dialog-close-button'>
            <CloseIcon />
          </S.DialogCloseButton>
          <label>팀 이름</label>
          <input
            {...register('name', { required: true })}
            autoComplete='off'
            aria-invalid={errors.name ? 'true' : 'false'}
          />
          {errors.name?.type === 'required' && (
            <p className='error' role='alert'>
              팀 이름은 필수 값 입니다.
            </p>
          )}
          <Grid container spacing={{ xs: 2 }}>
            <Grid xs={12} sm={12}>
              <label>성별</label>
              <Controller
                name='gender'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '팀 성별 값은 필수값 입니다.',
                  },
                }}
                defaultValue=''
                render={({ field }) => (
                  <RadioGroup
                    {...field}
                    row
                    aria-labelledby='demo-row-radio-buttons-group-label'
                    name='row-radio-buttons-group'
                  >
                    <FormControlLabel value='F' control={<Radio />} label='여성' />
                    <FormControlLabel value='M' control={<Radio />} label='남성' />
                    <FormControlLabel value='A' control={<Radio />} label='혼성' />
                  </RadioGroup>
                )}
              />
              {errors.gender?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.gender.message}
                </p>
              )}
            </Grid>
            <Grid xs={12} sm={12}>
              <label>지역</label>
              <Controller
                name='location'
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: '지역 값은 필수값 입니다.',
                  },
                }}
                render={({ field: { onChange } }) => (
                  <BasicSelect
                    title={selectLocation.title}
                    items={selectLocation.items}
                    size='small'
                    onSelect={onChange}
                  ></BasicSelect>
                )}
              />
              {errors.location?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.location.message}
                </p>
              )}
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
