import { styled } from 'styled-components';

export const List = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
  height: calc(100vh - 48px); // 48px는 Header의 높이(16px padding * 2 + Header 자체 높이)
`;
