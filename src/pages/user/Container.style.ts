import { styled } from '@mui/material/styles';
import { Box } from '@mui/system';

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

export const Filter = styled('section')`
  display: flex;
  align-items: center;
  font-size: 14px;
`;

export const Content = styled('section')`
  display: flex;
  flex-direction: column;
`;

export const FooterContainer = styled(Box)`
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
