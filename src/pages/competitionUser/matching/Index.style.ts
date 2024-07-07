import { styled } from 'styled-components';
import { containerFlexRow } from '@/styles/mixins';

export const Container = styled.div`
  ${containerFlexRow}
  flex-direction: row;
`;

export const LeftPanel = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f1eeff;
  border-radius: 16px;
  width: 30%;
  overflow: hidden;
`;

export const RightPanel = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border: 1px solid;
  border-radius: 8px;
  width: 65%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 18px 0;
`;
