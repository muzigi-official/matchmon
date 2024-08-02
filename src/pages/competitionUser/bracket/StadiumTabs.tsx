import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Switch, FormControlLabel } from '@mui/material';

import Tabs from '@/components/common/Tabs';
import Button from '@/components/common/Button';

import MatchEditField from './MatchEditField';
import MatchViewField from './MatchViewField';
import * as S from './Index.style';
import { Table, TableHeader, TableContainer, TableBody, TableRow, TableHeaderCell } from './Tables.style';

interface IStadiumTabsProps {
  isLoading: boolean;
  schedules: IMatchScheduleDto[];
  teamOptions: ISelectProperty[];
  stadiumsOptions: ISelectProperty[];
  addMatch: () => void;
  createAutoSchedule: () => void;
  updateMatch: (match: IMatchScheduleDto) => void;
  removeMatch: (match: IMatchScheduleDto) => void;
  handleMatchChange: (id: number, field: keyof IMatchScheduleDto, value: string | number) => void;
  removeAllMatches: () => void;
}

const StadiumTabs = ({
  isLoading,
  schedules,
  teamOptions,
  stadiumsOptions,
  createAutoSchedule,
  addMatch,
  updateMatch,
  removeMatch,
  removeAllMatches,
  handleMatchChange,
}: IStadiumTabsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const stadiums = Array.from(new Set(schedules.map(match => match.stadium)));

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const renderMatchFields = (matches: IMatchScheduleDto[]) => (
    <React.Fragment>
      <S.TopActions>
        <FormControlLabel
          control={<Switch checked={isEditMode} onChange={toggleEditMode} />}
          label={isEditMode ? 'Edit Mode' : 'View Mode'}
        />
        {isEditMode && (
          <S.ButtonList>
            <Button variant='outlined' color='primary' onClick={createAutoSchedule}>
              일정 자동 생성
            </Button>

            <Button variant='outlined' color='danger' onClick={removeAllMatches}>
              일정 초기화
            </Button>
            {/* TODO: 이 버튼 누르면 한번 더 물어봐야할 것 같긴 함. */}
          </S.ButtonList>
        )}
      </S.TopActions>
      <S.TimeTable>
        {isLoading ? (
          <span> loading...</span>
        ) : (
          <React.Fragment>
            {isEditMode ? (
              <React.Fragment>
                {matches.map(match => (
                  <MatchEditField
                    key={match.id}
                    match={match}
                    stadiumOptions={stadiumsOptions}
                    teamOptions={teamOptions}
                    onMatchChange={handleMatchChange}
                    onUpdate={updateMatch}
                    onRemove={removeMatch}
                  />
                ))}
                <Button variant='fab' onClick={addMatch}>
                  <AddIcon />
                </Button>
              </React.Fragment>
            ) : (
              <TableContainer>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHeaderCell>시간</TableHeaderCell>
                      <TableHeaderCell>구장</TableHeaderCell>
                      <TableHeaderCell>홈 팀</TableHeaderCell>
                      <TableHeaderCell>원정 팀</TableHeaderCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {matches.map(match => (
                      <MatchViewField key={match.id} match={match} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </React.Fragment>
        )}
      </S.TimeTable>
    </React.Fragment>
  );

  const tabs = [
    {
      key: 'all', // 고유한 키 추가
      label: '전체',
      content: renderMatchFields(schedules),
    },
    ...stadiums.map(stadium => ({
      key: stadium, // 고유한 키 추가
      label: stadium,
      content: renderMatchFields(schedules.filter(match => match.stadium === stadium)),
    })),
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default StadiumTabs;
