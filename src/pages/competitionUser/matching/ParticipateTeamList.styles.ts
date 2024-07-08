import { styled } from 'styled-components';

export const List = styled.ul`
  flex: 1;
  overflow-y: auto;
  padding: 0 8px;
  height: calc(100vh - 48px); // 48px는 Header의 높이(16px padding * 2 + Header 자체 높이)
`;

export const ListItem = styled.li<{ color: string }>`
  display: flex;
  align-items: center;
  background-color: white;
  margin: 12px 8px;
  border-radius: 8px;
  padding: 8px 12px;

  span:first-child {
    width: 36px;
    height: 36px;
    background-color: ${props => props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span {
    font-size: 0.875rem;
  }

  span + span {
    margin-left: 8px;
  }
`;

export const Emblem = styled.div`
  width: 24px;
  height: 32px;
  justify-content: center;
  line-height: 30px;
`;

export const EmptyEmblem = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
