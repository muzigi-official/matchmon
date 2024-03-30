import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/redux/store';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logIn, logOut } from '@/redux/module/user';
import { setCompetition } from '@/redux/module/competition';
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
  // FIXME: 콘솔이 두번씩 찍힌다. 총 4개(원래 한개 더 찍히는 거 말고 한번 더 찍힘)
  const dispatch = useAppDispatch();
  const isSignIn = useAppSelector((state: RootState) => state.user.isSignIn);
  const selectedCompetition = useAppSelector((state: RootState) => state.competition.selectedCompetition);
  const navigate = useNavigate();
  const { open, onClickMenu } = props;
  const [token, setToken] = useState<string>('');
  const [competitions, setCompetitions] = useState<SelectProperty[]>([]);

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
    dispatch(setCompetition(value));
    if (Number(value) !== 0 && value !== selectedCompetition) {
      navigate(`/admin/competition/${value}`);
    }
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
          {competitions.length > 0 ? (
            <BasicSelect
              title='대회를 선택해주세요'
              size='small'
              defaultValue={selectedCompetition}
              items={competitions}
              onSelect={value => {
                changeFilterOption(value);
              }}
            />
          ) : (
            ''
          )}
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
