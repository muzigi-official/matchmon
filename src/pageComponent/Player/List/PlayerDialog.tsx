import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@/components/common/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';

import InputSelect from '@/components/select/InputSelect';

import {
  DialogHeader,
  DialogHeaderTitle,
  DialogHeaderBody,
  DialogContent,
  DialogCloseButton,
  DialogFooter,
} from '@/components/dialog/Dialog.style';

interface Props {
  player?: ParsePlayer | null;
  teams: SelectProperty[];
  open: boolean;
  onClose: () => void;
  onConfirm: (player: playerFormInput) => void;
}

export default function PlayerDialog({ player, teams, open, onClose, onConfirm }: Props) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<playerFormInput>();

  const dialogType = player !== null ? '수정' : '생성';

  useEffect(() => {
    reset({
      id: player ? player.id : 0,
      nickName: player ? player.nickName : '',
      uniformNumber: player ? player.uniformNumber : 0,
      picture: player ? player.picture : '',
      role: player ? player.role : 0,
      teamId: player ? player.teamId : '',
    });
  }, [open, player]);

  const onSubmit: SubmitHandler<playerFormInput> = async formData => {
    onConfirm(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='dialog-title' aria-describedby='dialog-description'>
      <DialogHeader id='dialog-title'>
        <DialogHeaderTitle variant='h4'>
          {`선수 ${dialogType}`}
          <DialogHeaderBody variant='body1'>선수의 상세 정보를 입력하세요.</DialogHeaderBody>
        </DialogHeaderTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogCloseButton onClick={onClose}>
            <CloseIcon />
          </DialogCloseButton>
          <Grid container spacing={{ xs: 2 }}>
            <Grid xs={12} sm={12}>
              <label>이름</label>
              <input
                {...register('nickName', { required: '선수 이름은 필수값입니다.' })}
                autoComplete='off'
                aria-invalid={errors.nickName ? 'true' : 'false'}
              />
              {errors.nickName?.type === 'required' && (
                <p className='error' role='alert'>
                  {errors.nickName.message}
                </p>
              )}
            </Grid>
            <Grid xs={12} sm={12}>
              <InputSelect
                label='팀'
                register={register('teamId', { required: '팀은 필수값입니다.' })}
                options={teams}
                errors={errors}
                disabled={player !== null}
              />
            </Grid>
            <Grid xs={12} sm={12}>
              <label>등번호</label>
              <input
                {...register('uniformNumber')}
                autoComplete='off'
                aria-invalid={errors.uniformNumber ? 'true' : 'false'}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogFooter>
          <Button type='submit' variant='contained'>
            저장
          </Button>
          <Button variant='outlined' onClick={onClose}>
            취소
          </Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
}
