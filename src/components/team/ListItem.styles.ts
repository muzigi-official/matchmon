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
  border-radius: 8px;
  gap: 8px;
  padding: 8px;
  font-size: 0.8125rem;

  span:first-child {
    width: 30px;
    height: 30px;
    background-color: ${props => props.color};
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span:last-child {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: pre;
  }
`;

export const Emblem = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;

export const EmptyEmblem = styled.img`
  width: 24px;
  height: 24px;
  object-fit: contain;
`;
