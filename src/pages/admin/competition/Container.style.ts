import { styled } from '@mui/material/styles';

export const Container = styled('div')`
  padding: 12px 0;
`;

export const Top = styled('div')`
  display: flex;
  justify-content: flex-end;
  button + button {
    margin-left: 8px;
  }
`;
