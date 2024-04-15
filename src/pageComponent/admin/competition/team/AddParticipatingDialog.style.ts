import { styled } from '@mui/material/styles';

interface ListItemProps {
  isAttend?: boolean;
}

export const List = styled('ul')`
  list-style-type: none;
  margin: 0;
  padding: 0;
  text-align: center;
`;

// export const ListItemDiv = styled('li')`
//   display: inline-block;
//   margin-right: 8px; /* 각 이름 사이의 간격 조정 */
//   margin-bottom: 8px; /* 각 이름 사이의 간격 조정 */
//   width: 120px;
//   height: 40px;
//   border: ${props => (props.isAttend ? 'solid 1px red' : 'solid 1px black')};
//   /* border: ${props =>
//     props.isAttend ? 'solid 1px var(--mui-palette-primary-main)' : 'solid 1px var(--border-color)'}; */
//   border-radius: 16px;
//   text-align: center;
//   line-height: 40px;
//   cursor: pointer;

//   &:hover {
//     border: solid 2px black;
//   }
// `;

export const ListItem = styled('li', {
  shouldForwardProp: prop => prop !== 'isAttend',
})<ListItemProps>(({ isAttend }) => ({
  display: 'inline-block',
  marginRight: '8px',
  marginBottom: '8px',
  width: '120px',
  height: '40px',
  border: isAttend ? 'solid 2px var(--mui-palette-primary-main)' : 'solid 1px black',
  color: isAttend ? 'var(--mui-palette-primary-main)' : 'black',

  borderRadius: '16px',
  textAlign: 'center',
  lineHeight: '40px',
  cursor: 'pointer',

  '&:hover': {
    border: 'solid 2px black',
  },
}));
