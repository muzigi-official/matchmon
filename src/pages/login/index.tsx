import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import { signIn } from '@/auth/AuthService';
import useUserStore from '@/store/useUserStore';
import Button from '@/components/common/Button';
import { idValidation, passwordValidation } from '@/utils/validataion';

import { LoginContainer, Logo, LoginTitle, Form } from './Login.style'; // LinksContainer, StyledLink, OAuthContainer

interface ILoginForm {
  id: string;
  password: string;
}

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { logIn, setUser } = useUserStore();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginForm>();

  const onSubmit = async (data: ILoginForm) => {
    try {
      const token = await signIn({ username: data.id, password: data.password });
      logIn(token);
      await setUser();
      navigate('/main'); // 로그인 후 리다이렉션
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <LoginContainer>
      <Logo src='matchmon-logo.png' alt='Logo' />
      <LoginTitle>매치엔 매치몬</LoginTitle>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          fullWidth
          id='id'
          label='id'
          {...register('id', idValidation)}
          error={!!errors.id}
          helperText={errors.id?.message}
          autoComplete='email'
        />
        <TextField
          fullWidth
          id='password'
          label='password'
          type={showPassword ? 'text' : 'password'}
          {...register('password', passwordValidation)}
          error={!!errors.password}
          helperText={errors.password?.message}
          autoComplete='current-password'
          InputProps={{
            endAdornment: (
              <InputAdornment position='end'>
                <IconButton aria-label='toggle password visibility' onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Button type='submit' block disabled={isSubmitting}>
          로그인
        </Button>
      </Form>
      {/* TODO: 나중에 필요할 때 살리기
      <LinksContainer>
        <StyledLink href='/forgot-password' target='_blank'>
          비밀번호 재설정
        </StyledLink>
        {' | '}
        <StyledLink href='/register' target='_blank'>
          회원가입
        </StyledLink>
      </LinksContainer>
      <OAuthContainer>
        <StyledLink href='https://your-kakao-login-url.com' target='_blank'>
          <Button variant='outlined' color='#febb02'>
            카카오 로그인
          </Button>
        </StyledLink>
        <StyledLink href='https://your-google-login-url.com' target='_blank'>
          <Button variant='outlined' color='#db4437'>
            구글 로그인
          </Button>
        </StyledLink>
      </OAuthContainer> */}
    </LoginContainer>
  );
};

export default Login;
