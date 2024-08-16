import { useState, ChangeEvent } from 'react';
import dayjs from 'dayjs';
import { Container } from './styles';
import DatePicker from './DatePicker';
import TimePicker from './TimePicker';

interface IDateTimePickerProps {
  onChange: (dateTime: Date) => void;
}

const DateTimePicker = ({ onChange }: IDateTimePickerProps) => {
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');

  const handleDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (time) {
      onChange(dayjs(`${selectedDate}T${time}`).toDate());
    }
  };

  const handleTimeChange = (selectedTime: string) => {
    setTime(selectedTime);
    if (date) {
      onChange(dayjs(`${date}T${selectedTime}`).toDate());
    }
  };

  return (
    <Container>
      <DatePicker onChange={handleDateChange} label='Date' />
      <TimePicker onChange={handleTimeChange} label='Time' />
    </Container>
  );
};

export default DateTimePicker;
