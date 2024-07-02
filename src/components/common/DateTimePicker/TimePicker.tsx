import { ChangeEvent, useCallback, useState } from 'react';
import { TimeInput, Label } from './styles';

interface ITimePickerProps {
  onChange: (time: string) => void;
  label?: string;
  min?: string;
}

const TimePicker = ({ onChange, label, min }: ITimePickerProps) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange(e.target.value);
    },
    [onChange],
  );

  return (
    <div>
      <Label>{label}</Label>
      <TimeInput type='time' onChange={handleChange} min={min} value={value} />
    </div>
  );
};

export default TimePicker;
