import { styled } from 'styled-components';
import { mediaQuery } from '@/styles/mediaQuery';
import { containerFlexCol } from '@/styles/mixins';

interface StatusBadgeProps {
  $status: string;
}

export const Container = styled.div`
  ${containerFlexCol};
`;

export const Top = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button + button {
    margin-left: 8px;
  }
`;

export const Title = styled.h3`
  display: flex;
  gap: 12px;
  a {
    text-decoration: underline;
    color: inherit;

    &:hover {
      cursor: pointer;
      text-decoration: underline;
    }
  }
`;

export const Content = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 18px;
  height: 100vh;

  ${mediaQuery.mobile} {
    flex-direction: column;
    align-items: center;
  }
`;

export const Left = styled.div`
  flex-basis: 33.3333%;
  -webkit-box-flex: 0;
  flex-grow: 0;
  max-width: 33.3333%;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 70vh;

  ${mediaQuery.mobile} {
    flex: none;
    width: 100%;
    max-width: 100%;
  }
`;

export const Right = styled.div`
  flex-basis: 66.6667%;
  max-width: 66.6667%;
  -webkit-box-flex: 0;
  flex-grow: 0;

  display: flex;
  flex-direction: column;
  gap: 12px;
  height: 70vh;

  ${mediaQuery.mobile} {
    flex: none;
    width: 100%;
    max-width: 100%;
  }
`;

export const NameContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Name = styled.h3`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

export const StatusBadge = styled.span<StatusBadgeProps>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 12px;
  background-color: ${({ $status }) => {
    if ($status === '대회예정') return '#feffe0';
    if ($status === '진행중') return '#e8f9e9';
    return '#ffebee';
  }};
  color: ${({ $status }) => {
    if ($status === '대회예정') return '#ffd000';
    if ($status === '진행중') return '#4caf50';
    return '#d32f2f';
  }};
  font-size: 12px;
`;

export const Info = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

export const Details = styled.div`
  margin-top: 20px;
  width: 100%;
`;

export const DetailTitle = styled.h4`
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
`;

export const DetailItem = styled.p`
  margin: 5px 0;
  font-size: 14px;
  color: #555;

  & > span {
    font-weight: 700;
    color: #000;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const PanelAction = styled.div`
  display: flex;
  justify-content: space-between;
`;
