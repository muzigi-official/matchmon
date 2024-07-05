import { styled } from 'styled-components';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

export const DialogHeader = styled.div`
  padding: 64px 32px 24px;
  display: flex;
  justify-content: center;
  text-align: center;
`;

export const DialogHeaderTitle = styled(Typography)`
  font-size: 24px;
  padding: 0;
`;

export const DialogHeaderBody = styled(Typography)`
  font-size: 0.75rem;
`;

export const DialogContent = styled.div`
  padding: 2px 24px 18px;
`;

export const DialogCloseButton = styled(IconButton)`
  position: absolute;
  inset-block-start: 1rem;
  inset-inline-end: 1rem;
`;

export const DialogFooter = styled.div`
  display: flex;
  justify-content: center;
  padding: 0 32px 64px;

  button + button {
    margin: 0px 11px;
  }

  button:last-child {
    border-color: var(--border-color);
    color: var(--border-color);
  }
`;
