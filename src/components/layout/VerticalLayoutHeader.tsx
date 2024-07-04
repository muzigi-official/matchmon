import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { RootState } from '@/redux/store';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { logIn, logOut } from '@/redux/module/user';
import { setCompetition } from '@/redux/module/competition';
import { signIn } from '@/api/auth';
import CustomSelect from '@/components/common/Select/CustomSelect';

import { listCompetition } from '@/api/competition';

interface AppBarProps {
  open: boolean;
  userRole: string;
  onClickMenu: () => void;
}

import * as S from './Main.style';

import Button from '@/components/common/Button';

export default function VerticalLayoutHeader({ open, userRole, onClickMenu }: AppBarProps) {
  const dispatch = useAppDispatch();
  const isSignIn = useAppSelector((state: RootState) => state.user.isSignIn);
  const selectedCompetition = useAppSelector((state: RootState) => state.competition.selectedCompetition);
  const navigate = useNavigate();
  const [token, setToken] = useState<string>('');
  const [competitions, setCompetitions] = useState<ISelectProperty[]>([]);

  const handleSignIn = async () => {
    const data = await signIn({ username: 'adminDev', password: '1q2w3e' });
    dispatch(logIn(data.access_token));
    setToken(data.access_token);
  };

  const getList = async () => {
    const response = await listCompetition(1);
    const parsing = response.data.map(competition => {
      return {
        text: competition.name,
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
            src='/matchmon-logo.png'
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
            <CustomSelect
              label='대회를 선택해주세요'
              defaultValue={selectedCompetition}
              options={competitions}
              onSelect={value => {
                changeFilterOption(value);
              }}
            />
          ) : (
            ''
          )}
        </S.ToolbarStart>
        <S.ToolbarEnd>
          <span>{userRole}</span>
          <span>토큰: {token && token.substring(0, 10)}</span>
          {isSignIn ? (
            <Button
              variant='outlined'
              onClick={() => {
                handleSignOut();
              }}
            >
              LogOut
            </Button>
          ) : (
            <Button
              variant='outlined'
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
