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
  schedules: IMatchSchedule[];
  teamOptions: ISelectProperty[];
  stadiumsOptions: ISelectProperty[];
  addMatch: () => void;
  createAutoSchedule: () => void;
  removeMatch: (index: number) => void;
  handleMatchChange: (index: number, field: keyof IMatchSchedule, value: string | number) => void;
}

const StadiumTabs = ({
  isLoading,
  schedules,
  teamOptions,
  stadiumsOptions,
  createAutoSchedule,
  addMatch,
  removeMatch,
  handleMatchChange,
}: IStadiumTabsProps) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const stadiums = Array.from(new Set(schedules.map(match => match.stadium)));

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };

  const renderMatchFields = (filteredMatches: IMatchSchedule[]) => (
    <React.Fragment>
      <FormControlLabel
        control={<Switch checked={isEditMode} onChange={toggleEditMode} />}
        label={isEditMode ? 'Edit Mode' : 'View Mode'}
      />
      {isEditMode && (
        <Button variant='outlined' color='primary' onClick={createAutoSchedule}>
          일정 자동 생성
        </Button>
      )}
      <S.TimeTable>
        {isLoading ? (
          <span> loading...</span>
        ) : (
          <React.Fragment>
            {isEditMode ? (
              filteredMatches.map((match, index) => (
                <MatchEditField
                  key={index}
                  match={match}
                  index={index}
                  stadiumOptions={stadiumsOptions}
                  teamOptions={teamOptions}
                  onMatchChange={handleMatchChange}
                  onRemove={removeMatch}
                />
              ))
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
                    {schedules.map((match, index) => (
                      <MatchViewField key={index} match={match} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
            {isEditMode && (
              <Button variant='fab' onClick={addMatch}>
                <AddIcon />
              </Button>
            )}
          </React.Fragment>
        )}
      </S.TimeTable>
    </React.Fragment>
  );

  const tabs = [
    {
      label: '전체',
      content: renderMatchFields(schedules),
    },
    ...stadiums.map(stadium => ({
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
