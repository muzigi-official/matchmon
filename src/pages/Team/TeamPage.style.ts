import styled from 'styled-components';
import Stack from '@mui/material/Stack';

export const PageContainer = styled.div`
  margin: 0;
  padding: 0;
  background-color: purple;
`;

export const PageHeader = styled(Stack)`
  display: flex;
  margin: 0;
  padding: 0;
  background-color: orange;
`;

export const PageContent = styled(Stack)`
  background-color: #defeee;
  border: 0;
  color: white;
`;

export const ActionRows = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: pink;
`;
