import { useState, ChangeEvent } from 'react';

import dayjs from 'dayjs';

import DatePicker from '../DatePicker';
import TimePicker from '../TimePicker';
import { Container, PickerGroup, PickerContainer, Label, Separator } from '../styles';

interface IDateTimeRangePickerProps {
  startValue: Date | null;
  endValue: Date | null;
  onChange: (startDateTime: Date, endDateTime: Date) => void;
}

const DateTimeRangePicker = ({ startValue, endValue, onChange }: IDateTimeRangePickerProps) => {
  const [startDate, setStartDate] = useState<string>(startValue ? dayjs(startValue).format('YYYY-MM-DD') : '');
  const [startTime, setStartTime] = useState<string>(startValue ? dayjs(startValue).format('HH:mm') : '');
  const [endDate, setEndDate] = useState<string>(endValue ? dayjs(endValue).format('YYYY-MM-DD') : '');
  const [endTime, setEndTime] = useState<string>(endValue ? dayjs(endValue).format('HH:mm') : '');

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
      <PickerGroup>
        <Label>Start DateTime</Label>
        <PickerContainer>
          <DatePicker onChange={handleStartDateChange} max={endDate} />
          <TimePicker onChange={handleStartTimeChange} />
        </PickerContainer>
      </PickerGroup>
      <Separator>~</Separator>
      <PickerGroup>
        <Label>End DateTime</Label>
        <PickerContainer>
          <DatePicker onChange={handleEndDateChange} min={startDate} />
          <TimePicker onChange={handleEndTimeChange} min={startTime} />
        </PickerContainer>
      </PickerGroup>
    </Container>
  );
};

export default DateTimeRangePicker;
