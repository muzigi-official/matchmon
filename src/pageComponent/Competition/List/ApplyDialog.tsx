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
} from '@/components/common/dialog/Dialog.style';

interface Props {
  open: boolean;
  team?: Team | null;
  teams: SelectProperty[];
  onClose: () => void;
  onConfirm: (formData: ApplyFormInput) => void;
}

export default function ApplyDialog({ team, teams, open, onClose, onConfirm }: Props) {
  const {
    register,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<ApplyFormInput>();

  useEffect(() => {
    reset({
      teamId: '',
    });
  }, [open]);

  const onSubmit: SubmitHandler<ApplyFormInput> = async formData => {
    onConfirm(formData);
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='dialog-apply' aria-describedby='dialog-apply-description'>
      <DialogHeader id='dialog-title'>
        <DialogHeaderTitle variant='h4'>
          참가 신청서
          <DialogHeaderBody variant='body1'>대회에 참여하는 팀의 정보를 입력하세요.</DialogHeaderBody>
        </DialogHeaderTitle>
      </DialogHeader>

      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogCloseButton onClick={onClose}>
            <CloseIcon />
          </DialogCloseButton>
          <Grid container spacing={{ xs: 2 }}>
            <Grid xs={12} sm={12}>
              <InputSelect
                label='팀'
                register={register('teamId', { required: '팀은 필수값입니다.' })}
                options={teams}
                errors={errors}
                disabled={team !== undefined}
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
