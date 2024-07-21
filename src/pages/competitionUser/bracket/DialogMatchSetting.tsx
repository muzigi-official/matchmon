import { useEffect } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';

import { Dialog } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import Button from '@/components/common/Button';
import {
  DialogHeader,
  DialogHeaderTitle,
  DialogHeaderBody,
  DialogContent,
  DialogCloseButton,
  DialogFooter,
} from '@/components/common/dialog/Dialog.style';
import FormSelect from '@/components/common/Select/FormSelect';

interface IMatchSettingProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: IFormValues) => void;
}

interface IFormValues {
  stage: string;
  stadiumCount: number;
  matchDuration: number;
  hasHalves: boolean;
}

const stageOptions = [
  { value: '예선', text: '예선' },
  { value: '본선', text: '본선' },
  { value: '결선', text: '결선' },
];

const DEFAULT_MATCH_SETTING_VALUES: IFormValues = {
  stage: '예선',
  stadiumCount: 2,
  matchDuration: 15,
  hasHalves: false,
};

const MatchGenerator = ({ open, onClose, onSave }: IMatchSettingProps) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormValues>({
    defaultValues: DEFAULT_MATCH_SETTING_VALUES,
  });

  const onSubmit: SubmitHandler<IFormValues> = async formData => {
    onSave(formData);
  };

  useEffect(() => {
    if (open) {
      reset(DEFAULT_MATCH_SETTING_VALUES);
    }
  }, [open, reset]);
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth='sm'>
      <DialogHeader id='dialog-title'>
        <DialogHeaderTitle variant='h4'>
          경기 설정
          <DialogHeaderBody variant='body1'>경기의 상세 정보를 입력하세요.</DialogHeaderBody>
        </DialogHeaderTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <DialogCloseButton onClick={onClose}>
            <CloseIcon />
          </DialogCloseButton>
          <section>
            <div>
              <label>단계*</label>
              <Controller
                name='stage'
                control={control}
                render={({ field }) => (
                  <FormSelect
                    {...field}
                    options={stageOptions}
                    label='단계 선택'
                    value={field.value}
                    onChange={field.onChange}
                    onBlur={field.onBlur}
                    error={errors.stage?.message}
                  />
                )}
              />
              {errors.stage && <span>This field is required</span>}
            </div>
            <div>
              <label>구장 수*</label>
              <Controller
                name='stadiumCount'
                control={control}
                render={({ field }) => <input type='number' {...field} />}
              />
              {errors.stadiumCount && <span>This field is required</span>}
            </div>
            <div>
              <label>경기 시간(분)*</label>
              <Controller
                name='matchDuration'
                control={control}
                render={({ field }) => <input type='number' {...field} />}
              />
              {errors.matchDuration && <span>This field is required</span>}
            </div>
            <div>
              <label>전후반 여부*</label>
              <Controller
                name='hasHalves'
                control={control}
                render={({ field }) => (
                  <input
                    type='checkbox'
                    checked={field.value}
                    onChange={e => field.onChange(e.target.checked)}
                    name={field.name}
                    ref={field.ref}
                  />
                )}
              />
              {errors.hasHalves && <span>This field is required</span>}
            </div>
          </section>
        </DialogContent>
        <DialogFooter>
          <Button type='submit' color='primary'>
            생성
          </Button>
          <Button onClick={onClose}>취소</Button>
        </DialogFooter>
      </form>
    </Dialog>
  );
};

export default MatchGenerator;
