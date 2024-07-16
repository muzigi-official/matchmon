import { styled } from 'styled-components';
import { colors } from '@/styles/colors';
import { containerBasicCol } from '@/styles/mixins';
import { mediaQuery } from '@/styles/mediaQuery';

export const Container = styled.div`
  ${containerBasicCol}
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
  height: auto;
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
  border-radius: 8px;
  width: 24%;
  height: calc(var(--vh, 1vh) * 100 - 8px);
  overflow: hidden;
`;

export const RightPanel = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  border: 1px solid ${colors.border};
  border-radius: 8px;
  width: 76%;
  height: auto; /* Adjust height to auto */
  overflow: visible; /* Ensure content is not cut off */
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 18px 0;
`;
