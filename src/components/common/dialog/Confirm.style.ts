import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const DialogHeader = styled('div')`
  padding: 64px 64px 24px;
`;

export const DialogHeaderTitle = styled(Typography)`
  font-size: 1.5rem;
  padding: 0;
`;

export const DialogHeaderBody = styled(Typography)`
  font-size: 0.9375rem;
`;

export const DialogContent = styled('div')`
  padding: 64px 64px 24px;
`;

export const DialogFooter = styled('div')`
  padding: 0 64px 64px;
  display: flex;
  justify-content: center;

  button + button {
    margin: 0px 11px;
  }

  button:last-child {
    border-color: var(--border-color);
    color: var(--border-color);
  }
`;
