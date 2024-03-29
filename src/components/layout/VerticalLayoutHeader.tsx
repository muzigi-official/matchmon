import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/redux/store';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logIn, logOut } from '@/redux/module/user';
import { signIn } from '@/api/auth';
import { Button } from '@mui/material';
import BasicSelect from '@/components/select/BasicSelect';

import { listCompetition } from '@/api/competition';

interface AppBarProps {
  open: boolean;
  onClickMenu: () => void;
}

import * as S from './Main.style';

export default function VerticalLayoutHeader(props: AppBarProps) {
  const dispatch = useAppDispatch();
  const isSignIn = useAppSelector((state: RootState) => state.user.isSignIn);
  const navigate = useNavigate();
  const { open, onClickMenu } = props;
  const [token, setToken] = useState<string>('');
  const [competitions, setCompetitions] = useState<SelectProperty[]>([{ name: '대회를 선택해주세요', value: 0 }]);
  const handleSignIn = async () => {
    const data = await signIn({ username: 'soccerCoach', password: '1q2w3e' });
    dispatch(logIn(data.access_token));
    setToken(data.access_token);
  };

  const getList = async () => {
    const response = await listCompetition(1);
    const parsing = response.data.map(competition => {
      return {
        name: competition.name,
        value: competition.id,
      };
    });
    setCompetitions(parsing);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleSignOut = () => {
    dispatch(logOut());
    setToken('');
  };

  const changeFilterOption = (value: string) => {
    console.log('change', value);
    navigate(`/admin/competition/${value}`);
  };

  return (
    // TODO: TOKEN localStorage로 옮기든지 하기
    <S.AppBar position='fixed' color='inherit' open={open}>
      <S.Toolbar open={open}>
        <S.ToolbarStart>
          <S.MuiAvatar
            src='matchmon-logo.png'
            aria-label='main-logo-icon'
            onClick={onClickMenu}
            sx={{
              cursor: 'pointer',
              width: 30,
              height: 30,
              ...(open && { display: 'none' }),
            }}
          />

          <BasicSelect
            title='대회를 선택해주세요'
            size='small'
            items={competitions}
            onSelect={value => {
              changeFilterOption(value);
            }}
          ></BasicSelect>
        </S.ToolbarStart>
        <S.ToolbarEnd>
          토큰: {token && token.substring(0, 10)}
          {isSignIn ? (
            <Button
              variant='outlined'
              color='primary'
              onClick={() => {
                handleSignOut();
              }}
            >
              LogOut
            </Button>
          ) : (
            <Button
              variant='outlined'
              color='primary'
              onClick={() => {
                handleSignIn();
              }}
            >
              Login
            </Button>
          )}
        </S.ToolbarEnd>
      </S.Toolbar>
    </S.AppBar>
  );
}
