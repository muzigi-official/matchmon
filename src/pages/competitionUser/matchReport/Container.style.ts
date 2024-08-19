import { styled } from '@mui/material/styles';

export const Container = styled('div')`
  padding: 12px 0;
  display: flex;
  flex-direction: column;
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
  margin: 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  border-radius: 16px;
  gap: 12px;
`;

export const Header = styled('div')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 12px 0;

  & > span {
    flex-grow: 1; /* Span takes up as much space as possible */
  }

  & > div {
    flex-basis: 20%; /* Adjust width of the BasicSelect */
    max-width: 200px; /* Ensures it doesn't exceed a certain width */
    min-width: 100px; /* Optional: ensures it doesn't go below a certain width */
  }
`;

export const List = styled('ul')`
  li:last-child {
    justify-content: center;
    background-color: inherit;
  }
`;

export const ListItem = styled('li')`
  display: flex;
  align-items: center;
  background-color: white;
  margin: 12px;
  border-radius: 8px;
  padding: 8px 12px;

  span:first-child {
    width: 30px;
    height: 30px;
    background-color: #d2ea31;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
  }

  span + span {
    margin-left: 8px;
  }
`;
