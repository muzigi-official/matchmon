import { styled } from 'styled-components';
import { containerFlexCol } from '@/styles/mixins';
import { mediaQuery } from '@/styles/mediaQuery';

export const Container = styled.div`
  ${containerFlexCol}
  gap: 12px;
`;

export const Top = styled.section`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

export const Title = styled.h3`
  display: flex;
  gap: 12px;
  font-size: 14px;
  a {
    text-decoration: underline;
    color: inherit;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const Actions = styled.div`
  /* background-color: violet; */
  display: flex;
  justify-content: flex-end;
`;

export const Content = styled.section`
  display: flex;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - var(--gnb-width) - 72px);
  gap: 18px;

  ${mediaQuery.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

export const LeftPanel = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f1eeff;
  border-radius: 16px;
  width: 24%;
  overflow: hidden;
`;

export const RightPanel = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border: 1px solid;
  border-radius: 8px;
  width: 76%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 18px 0;
`;
