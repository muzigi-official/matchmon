import { useState } from 'react';
import { Container, TimeInput, Label, Separator, SubContainer } from '../styles';
import { handleTimeChange } from '../util';

interface ITimeRangePickerProps {
  onChange: (startTime: Date, endTime: Date) => void;
}

const TimeRangePicker = ({ onChange }: ITimeRangePickerProps) => {
  const [startTime, setStartTime] = useState<string>('');
  const [endTime, setEndTime] = useState<string>('');
  const startDate = '1970-01-01'; // 기본 날짜
  const endDate = '1970-01-01'; // 기본 날짜

  return (
    <Container>
      <SubContainer>
        <Label>Start Time</Label>
        <TimeInput
          type='time'
          value={startTime}
          onChange={handleTimeChange(setStartTime, onChange, startTime, endTime, startDate, endDate, true)}
        />
      </SubContainer>
      <Separator>~</Separator>
      <SubContainer>
        <Label>End Time</Label>
        <TimeInput
          type='time'
          value={endTime}
          onChange={handleTimeChange(setEndTime, onChange, startTime, endTime, startDate, endDate, false)}
          min={startTime}
        />
      </SubContainer>
    </Container>
  );
};

export default TimeRangePicker;
