import { styled } from 'styled-components';
import { spin } from '@/styles/animations';
import { colors } from '@/styles/colors';
import { mediaQuery } from '@/styles/mediaQuery';
import { containerBasicCol } from '@/styles/mixins';

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
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const MatchInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

export const MatchInfo = styled.div`
  margin-top: 8px;
`;

export const InfoText = styled.span`
  font-size: 16px;
  font-weight: 500;
`;

export const Highlight = styled.span`
  color: ${colors.primary};
  font-weight: bold;
`;

export const Spinner = styled.div`
  border: 4px solid rgba(0, 0, 0, 0.1);
  border-left-color: ${colors.primary};
  border-radius: 50%;
  width: 24px;
  height: 24px;
  animation: ${spin} 1s linear infinite;
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

export const TimeTable = styled.ul`
  display: flex;
  flex-direction: column;
`;

export const MatchItem = styled.li`
  display: flex;
`;
