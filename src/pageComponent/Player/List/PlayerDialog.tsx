import { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';

import {
  DialogHeader,
  DialogHeaderTitle,
  DialogHeaderBody,
  DialogContent,
  DialogCloseButton,
  DialogFooter,
} from '@/components/dialog/Dialog.style';

interface IFormInput {
  nickName: string;
  picture?: string;
}

interface Props {
  player?: Player | null;
  open: boolean;
  onClose: () => void;
  onConfirm: (player: IFormInput) => void;
}

export default function PlayerDialog({ player, open, onClose, onConfirm }: Props) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInput>();

  const dialogType = player !== null ? '수정' : '생성';

  useEffect(() => {
    reset({
      nickName: player ? player.nickName : '',
      picture: player ? player.picture : '',
    });
  }, []);

  const onSubmit: SubmitHandler<IFormInput> = async formData => {
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
                {...register('nickName', { required: true })}
                autoComplete='off'
                aria-invalid={errors.nickName ? 'true' : 'false'}
              />
              {errors.nickName?.type === 'required' && (
                <p className='error' role='alert'>
                  선수 이름은 필수 값 입니다.
                </p>
              )}
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
