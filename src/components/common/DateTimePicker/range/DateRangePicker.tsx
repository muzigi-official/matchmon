import { useState } from 'react';
import dayjs from 'dayjs';

import { Container, DateInput, Label, Separator, PickerGroup, PickerContainer } from '../styles';
import { handleDateChange } from '../util';

interface IDateRangePickerProps {
  startValue: Date | null;
  endValue: Date | null;
  onChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker = ({ startValue, endValue, onChange }: IDateRangePickerProps) => {
  const [startDate, setStartDate] = useState<string>(startValue ? dayjs(startValue).format('YYYY-MM-DD') : '');
  const [endDate, setEndDate] = useState<string>(endValue ? dayjs(endValue).format('YYYY-MM-DD') : '');

  return (
    <Container>
      <PickerGroup>
        <Label>Start Date</Label>
        <PickerContainer>
          <DateInput
            type='date'
            value={startDate}
            onChange={handleDateChange(setStartDate, onChange, startDate, endDate, true)}
            max={endDate}
          />
        </PickerContainer>
      </PickerGroup>
      <Separator>~</Separator>
      <PickerGroup>
        <Label>End Date</Label>
        <PickerContainer>
          <DateInput
            type='date'
            value={endDate}
            onChange={handleDateChange(setEndDate, onChange, startDate, endDate, false)}
            min={startDate}
          />
        </PickerContainer>
      </PickerGroup>
    </Container>
  );
};

export default DateRangePicker;
