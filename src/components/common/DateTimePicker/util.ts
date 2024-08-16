import dayjs from 'dayjs';
import { ChangeEvent } from 'react';

export const handleDateChange =
  (
    setDate: (date: string) => void,
    onChange: (start: Date, end: Date) => void,
    startDate: string,
    endDate: string,
    isStart: boolean,
  ) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
    if (isStart && endDate) {
      onChange(new Date(selectedDate), new Date(endDate));
    } else if (!isStart && startDate) {
      onChange(new Date(startDate), new Date(selectedDate));
    }
  };

export const handleTimeChange =
  (
    setTime: (time: string) => void,
    onChange: (start: Date, end: Date) => void,
    startTime: string,
    endTime: string,
    startDate: string,
    endDate: string,
    isStart: boolean,
  ) =>
  (e: ChangeEvent<HTMLInputElement>) => {
    const selectedTime = e.target.value;
    setTime(selectedTime);
    if (isStart && endTime && startDate && endDate) {
      onChange(dayjs(`${startDate}T${selectedTime}`).toDate(), dayjs(`${endDate}T${endTime}`).toDate());
    } else if (!isStart && startTime && startDate && endDate) {
      onChange(dayjs(`${startDate}T${startTime}`).toDate(), dayjs(`${endDate}T${selectedTime}`).toDate());
    }
  };
