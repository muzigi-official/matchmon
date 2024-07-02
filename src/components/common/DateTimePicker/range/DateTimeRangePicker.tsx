// src/components/common/DateTimePicker/DateTimeRangePicker.tsx
import { useState, ChangeEvent } from 'react';
import { Container, SubContainer, Label, Separator } from '../styles';
import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';

interface IDateTimeRangePickerProps {
  onChange: (startDateTime: Date, endDateTime: Date) => void;
}

const DateTimeRangePicker = ({ onChange }: IDateTimeRangePickerProps) => {
  const [startDate, setStartDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');

  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setStartDate(selectedDate);
    if (startTime && endDate && endTime) {
      onChange(new Date(`${selectedDate}T${startTime}`), new Date(`${endDate}T${endTime}`));
    }
  };

  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setEndDate(selectedDate);
    if (startDate && startTime && endTime) {
      onChange(new Date(`${startDate}T${startTime}`), new Date(`${selectedDate}T${endTime}`));
    }
  };

  const handleStartTimeChange = (selectedTime: string) => {
    setStartTime(selectedTime);
    if (startDate && endDate && endTime) {
      onChange(new Date(`${startDate}T${selectedTime}`), new Date(`${endDate}T${endTime}`));
    }
  };

  const handleEndTimeChange = (selectedTime: string) => {
    setEndTime(selectedTime);
    if (startDate && startTime && endDate) {
      onChange(new Date(`${startDate}T${startTime}`), new Date(`${endDate}T${selectedTime}`));
    }
  };

  return (
    <Container>
      <SubContainer>
        <Label>Start Date</Label>
        <DatePicker onChange={handleStartDateChange} label='Start Date' max={endDate} />
        <TimePicker onChange={handleStartTimeChange} label='Start Time' />
      </SubContainer>
      <Separator>~</Separator>
      <SubContainer>
        <Label>End Date</Label>
        <DatePicker onChange={handleEndDateChange} label='End Date' min={startDate} />
        <TimePicker onChange={handleEndTimeChange} label='End Time' min={startTime} />
      </SubContainer>
    </Container>
  );
};

export default DateTimeRangePicker;
