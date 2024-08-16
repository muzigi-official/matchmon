import styled from 'styled-components';

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
    border-radius: 4px;
    cursor: pointer;
  }
`;

export const Actions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  padding: 0 32px 64px;
`;
