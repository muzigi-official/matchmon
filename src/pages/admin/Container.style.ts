import { styled } from '@mui/material/styles';

export const Container = styled('div')`
  padding: 12px 0;
`;

export const Top = styled('section')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button + button {
    margin-left: 8px;
  }
`;

export const Content = styled('section')`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const ContentTop = styled('div')`
  display: flex;
  gap: 8px;
`;
