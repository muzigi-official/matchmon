import styled from 'styled-components';
import { colors } from '@/styles/colors';

export const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: 320px;
  height: 100vh; /* 전체 높이를 차지하도록 설정 */
  margin: auto;
  text-align: center;
`;

export const Logo = styled.img`
  width: 100px;
  margin-bottom: 20px;
`;

export const LoginTitle = styled.h4`
  margin: 20px 0;
  font-size: 24px;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 16px;
`;

export const LinksContainer = styled.div`
  margin-top: 20px;
  font-size: 0.75rem;
`;

export const StyledLink = styled.a`
  color: ${colors.black};
  text-decoration: none;
  font-size: 0.75rem;
  margin: 0 5px;

  &:hover {
    text-decoration: underline;
  }
`;

export const OAuthContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2%;
  margin-top: 20px;
  width: 100%;
`;
