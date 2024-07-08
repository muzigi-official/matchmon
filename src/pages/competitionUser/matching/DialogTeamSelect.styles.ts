// import { styled } from '@mui/material/styles';
import styled from 'styled-components';

interface ListItemProps {
  isAttend?: boolean;
}

export const Top = styled.div`
  text-align: right;
  margin-bottom: 12px;
`;

export const List = styled.ul`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style-type: none;
  gap: 8px;
  overflow-y: scroll;
  max-height: 264px;

  li {
    width: 164px;
    border: solid 1px #bdbdbd;
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const ListItem = styled.li<ListItemProps>(({ isAttend }) => ({
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

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 32px 64px;
`;
