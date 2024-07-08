import { styled } from '@mui/material/styles';

interface ListItemProps {
  isAttend?: boolean;
}

export const Top = styled('div')`
  text-align: right;
  margin-bottom: 12px;
`;

export const List = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

export const ListItem = styled('li', {
  shouldForwardProp: prop => prop !== 'isAttend',
})<ListItemProps>(({ isAttend }) => ({
  display: 'inline-block',
  marginRight: '8px',
  marginBottom: '8px',
  width: '120px',
  height: '40px',
  border: isAttend ? 'solid 1.6px var(--mui-palette-primary-main)' : 'solid 1px black',
  color: isAttend ? 'var(--mui-palette-primary-main)' : 'black',

  borderRadius: '16px',
  textAlign: 'center',
  lineHeight: '40px',
  cursor: 'pointer',

  '&:hover': {
    backgroundColor: isAttend
      ? 'rgba(--mui-palette-primary-main, 0.8)'
      : 'rgba(--mui-palette-primary-contrast-tex, 0.8)',
    opacity: 0.4,
  },
}));
