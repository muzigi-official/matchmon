import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Button from '@/components/common/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

// import InputSelect from '@/components/select/InputSelect';
import { LOCATION_INFO } from '@/constant/DefaultSetting';

import * as S from '@/components/common/dialog/Dialog.style';

interface Props {
  team?: ITeam | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (team: ITeamFormInput) => void;
}

const selectLocation = LOCATION_INFO;

export default function TeamDialog({ team, open, onClose, onConfirm }: Props) {
  const {
    register,
    formState: { errors },
    reset,
    control,
    handleSubmit,
  } = useForm<ITeamFormInput>();

  useEffect(() => {
    reset({
      name: team ? team.name : '',
      gender: team ? team.gender : '',
      location: team ? team.location : '',
      emblem: team ? team.emblem : '',
    });
  }, [team]);

  const dialogType = team !== null ? '수정' : '생성';

  const onSubmit: SubmitHandler<ITeamFormInput> = async formData => {
    onConfirm(formData);
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
          {`팀 ${dialogType}`}
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
              <InputSelect
                label='지역'
                register={register('location', { required: '지역값은 필수값입니다.' })}
                options={selectLocation.items}
                errors={errors}
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
          <Button variant='outlined' color='cancel' onClick={onClose}>
            취소
          </Button>
        </S.DialogFooter>
      </form>
    </Dialog>
  );
}
