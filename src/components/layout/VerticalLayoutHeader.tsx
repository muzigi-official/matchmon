import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

import { listCompetition } from '@/api/competition';
import BasicSelect from '@/components/common/Select/BasicSelect';
import useUserStore from '@/store/useUserStore';
import useCompetitionStore from '@/store/useCompetitionStore';

interface AppBarProps {
  open: boolean;
  userRole?: TUserRole;
  userName?: string;
  onClickMenu: () => void;
}

import * as S from './Main.style';

import Button from '@/components/common/Button';

export default function VerticalLayoutHeader({ open, userRole = 'user', userName = '', onClickMenu }: AppBarProps) {
  const isSignIn = useUserStore(state => state.isSignIn);
  const { logOut } = useUserStore();
  const { selectedCompetition, setCompetition } = useCompetitionStore();
  // const navigate = useNavigate();
  const [competitions, setCompetitions] = useState<ISelectProperty[]>([]);

  const getList = async () => {
    const response = await listCompetition(1);
    const parsing = response.data.map(competition => ({
      text: competition.name,
      value: competition.id ?? '',
    }));
    setCompetitions(parsing);
  };

  useEffect(() => {
    getList();
  }, []);

  const handleSignOut = () => {
    logOut();
  };

  const changeFilterOption = (selected: ISelectProperty) => {
    setCompetition(Number(selected.value));
    console.log(selected);
    // if (Number(value) !== 0 && value !== selectedCompetition) {
    //   navigate(`/admin/competition/${value}`);
    // }
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
            <BasicSelect
              name='competition'
              value={selectedCompetition}
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
          <span>{userRole}</span> | <span>{userName}</span>
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
