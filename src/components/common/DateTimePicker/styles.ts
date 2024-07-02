import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 2px;
  align-items: center;
`;

export const PickerGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  align-items: flex-start;
`;

export const PickerContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const DateInput = styled.input`
  padding: 8px;
  font-size: 16px;
`;

export const TimeInput = styled.input`
  padding: 8px;
  font-size: 16px;
`;

export const Label = styled.label`
  display: block;
  color: #666666;
`;

export const Separator = styled.span`
  font-size: 18px;
`;
