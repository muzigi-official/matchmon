import { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';

import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Unstable_Grid2';

import Button from '@/components/common/Button';
import FormSelect from '@/components/common/Select/FormSelect';

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
  team?: ITeam | null;
  teams: ISelectProperty[];
  onClose: () => void;
  onConfirm: (formData: IApplyFormInput) => void;
}

export default function ApplyDialog({ team, teams, open, onClose, onConfirm }: Props) {
  const { reset, control, handleSubmit } = useForm<IApplyFormInput>();

  useEffect(() => {
    reset({
      teamId: '',
    });
  }, [open]);

  const onSubmit: SubmitHandler<IApplyFormInput> = async formData => {
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
              <Controller
                name='teamId'
                control={control}
                defaultValue=''
                rules={{ required: '팀은 필수값입니다.' }}
                render={({ field, fieldState: { error } }) => (
                  <FormSelect
                    {...field}
                    options={teams}
                    disabled={team !== undefined}
                    label='팀'
                    error={error?.message}
                  />
                )}
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
