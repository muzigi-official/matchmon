import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { listCompetition } from '@/api/competition';
import CustomSelect from '@/components/common/Select/CustomSelect';
import { RootState } from '@/redux/store';
import { useAppSelector, useAppDispatch } from '@/redux/hooks';
import { setCompetition } from '@/redux/module/competition';
import useUserStore from '@/store/useUserStore';

interface AppBarProps {
  open: boolean;
  userRole: string;
  onClickMenu: () => void;
}

import * as S from './Main.style';

import Button from '@/components/common/Button';

export default function VerticalLayoutHeader({ open, userRole, onClickMenu }: AppBarProps) {
  const dispatch = useAppDispatch();
  const isSignIn = useUserStore(state => state.isSignIn);
  const { logOut } = useUserStore();
  const selectedCompetition = useAppSelector((state: RootState) => state.competition.selectedCompetition);
  const navigate = useNavigate();
  const [competitions, setCompetitions] = useState<ISelectProperty[]>([]);

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
    logOut();
  };

  const changeFilterOption = (value: string) => {
    dispatch(setCompetition(value));
    if (Number(value) !== 0 && value !== selectedCompetition) {
      navigate(`/admin/competition/${value}`);
    }
  };

  return (
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
            ''
          )}
        </S.ToolbarEnd>
      </S.Toolbar>
    </S.AppBar>
  );
}
