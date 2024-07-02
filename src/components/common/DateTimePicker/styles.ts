import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`;

export const SubContainer = styled.div`
  display: flex;
  flex-direction: column;
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
`;

export const Separator = styled.span`
  font-size: 18px;
`;
