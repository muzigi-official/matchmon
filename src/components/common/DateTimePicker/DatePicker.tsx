import { ChangeEvent, useCallback, useState } from 'react';
import { DateInput, Label } from './styles';

interface IDatePickerProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  min?: string;
  max?: string;
}

const DatePicker = ({ onChange, label, min, max }: IDatePickerProps) => {
  const [value, setValue] = useState('');

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setValue(e.target.value);
      onChange(e);
    },
    [onChange],
  );

  return (
    <div>
      <Label>{label}</Label>
      <DateInput type='date' onChange={handleChange} min={min} max={max} value={value} />
    </div>
  );
};

export default DatePicker;
