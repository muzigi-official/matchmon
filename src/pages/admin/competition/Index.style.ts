import { styled } from 'styled-components';
import { containerMixin } from '@/styles/mixins';

export const Container = styled.div`
  ${containerMixin}
`;

export const Top = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  button + button {
    margin-left: 8px;
  }
`;

export const Content = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
`;

export const Left = styled.div`
  background-color: tomato;
`;

export const Right = styled.div`
  background-color: powderblue;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`;
