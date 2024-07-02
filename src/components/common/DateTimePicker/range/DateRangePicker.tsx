import { useState } from 'react';
import { Container, DateInput, Label, Separator, SubContainer } from '../styles';
import { handleDateChange } from '../util';

interface IDateRangePickerProps {
  onChange: (startDate: Date, endDate: Date) => void;
}

const DateRangePicker = ({ onChange }: IDateRangePickerProps) => {
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');

  return (
    <Container>
      <SubContainer>
        <Label>Start Date</Label>
        <DateInput
          type='date'
          value={startDate}
          onChange={handleDateChange(setStartDate, onChange, startDate, endDate, true)}
          max={endDate}
        />
      </SubContainer>
      <Separator>~</Separator>
      <SubContainer>
        <Label>End Date</Label>
        <DateInput
          type='date'
          value={endDate}
          onChange={handleDateChange(setEndDate, onChange, startDate, endDate, false)}
          min={startDate}
        />
      </SubContainer>
    </Container>
  );
};

export default DateRangePicker;
