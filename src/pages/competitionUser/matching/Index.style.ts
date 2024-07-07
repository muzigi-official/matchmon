import { styled } from 'styled-components';
import { containerMixin } from '@/styles/mixins';

export const Container = styled.div`
  ${containerMixin}
`;

export const Content = styled.section`
  margin: 0 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  background-color: #f1eeff;
  border-radius: 16px;
  width: 50%;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 16px 18px 0;
`;

export const List = styled.ul``;

export const ListItem = styled.li`
  display: flex;
  align-items: center;
  background-color: white;
  margin: 12px;
  border-radius: 8px;
  padding: 8px 12px;

  span:first-child {
    width: 30px;
    height: 30px;
    background-color: #d2ea31;
    text-align: center;
    line-height: 30px;
    border-radius: 50%;
  }

  span {
    font-size: 1rem;
    font-weight: 700;
  }

  span + span {
    margin-left: 8px;
  }
`;
