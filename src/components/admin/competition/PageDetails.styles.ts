import { styled } from '@mui/material/styles';
import { mediaQuery } from '@/styles/mediaQuery';

export const Container = styled('div')`
  padding: 12px 0;
`;

export const Top = styled('section')`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button + button {
    margin-left: 8px;
  }
`;

export const Title = styled('h3')`
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

export const Content = styled('section')`
  display: flex;
  justify-content: center;
  gap: 12px;
  width: 100%;

  ${mediaQuery.mobile} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

export const LeftPanel = styled('div')`
  flex: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;

  ${mediaQuery.tabletDown} {
    flex: none;
    width: 100%;
    margin: 10px 0;
  }
`;

export const NameContainer = styled('div')`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Name = styled('h3')`
  margin: 0;
  font-size: 24px;
  font-weight: 700;
`;

export const StatusBadge = styled('span')<{ status: string }>`
  display: inline-block;
  padding: 5px 10px;
  border-radius: 12px;
  background-color: ${({ status }) => {
    if (status === '대회예정') return '#feffe0';
    if (status === '진행중') return '#e8f9e9';
    return '#ffebee';
  }};
  color: ${({ status }) => {
    if (status === '대회예정') return '#ffd000';
    if (status === '진행중') return '#4caf50';
    return '#d32f2f';
  }};
  font-size: 12px;
`;

export const Info = styled('p')`
  margin: 5px 0;
  font-size: 14px;
  color: #555;
`;

export const Details = styled('div')`
  margin-top: 20px;
  width: 100%;
`;

export const DetailTitle = styled('h4')`
  margin-bottom: 10px;
  font-size: 18px;
  color: #333;
`;

export const DetailItem = styled('p')`
  margin: 5px 0;
  font-size: 14px;
  color: #555;

  & > span {
    font-weight: 700;
    color: #000;
  }
`;

export const ButtonContainer = styled('div')`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

export const RightPanel = styled('div')`
  flex: 7;
  margin: 0 10px;
  padding: 20px;
  background-color: skyblue;

  ${mediaQuery.tabletDown} {
    flex: none;
    width: 100%;
    margin: 10px 0;
  }
`;
