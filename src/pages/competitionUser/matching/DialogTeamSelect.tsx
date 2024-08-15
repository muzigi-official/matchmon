import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';

import * as S from './DialogTeamSelect.styles';
import { DialogHeader, DialogHeaderTitle, DialogContent } from '@/components/common/dialog/Dialog.style';
import ListTeamItem from '@/components/team/ListItem';

interface IParseTeams extends IJoinTeamComps {
  disabled: boolean;
  selected: boolean;
}

interface TeamSelectPopupProps {
  open: boolean;
  teams: IJoinTeamComps[];
  selectedGroupTeams: IJoinTeamComps[];
  groupName: string;
  onClick: (team: IJoinTeamComps) => void;
  onClose: () => void;
}

const DialogTeamSelect = ({ open, teams, selectedGroupTeams, groupName, onClick, onClose }: TeamSelectPopupProps) => {
  const [list, setList] = useState<IParseTeams[]>();
  const [selectedCount, setSelectedCount] = useState<number>(0);

  useEffect(() => {
    const updatedTeams = teams.map(team => ({
      ...team,
      disabled: team.group !== '-',
      selected: selectedGroupTeams.some(selectedTeam => selectedTeam.teamId === team.teamId),
    }));
    setList(updatedTeams);
    setSelectedCount(selectedGroupTeams.length);
  }, [teams, selectedGroupTeams]);

  const handleClickTeam = (team: IParseTeams) => {
    onClick(team);
    setList((prevList = []) => prevList.map(t => (t.id === team.teamId ? { ...t, selected: !t.selected } : t)));
    setSelectedCount(prevCount => (team.selected ? prevCount - 1 : prevCount + 1));
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='dialog-apply' aria-describedby='dialog-apply-description'>
      <DialogHeader id='dialog-title'>
        <DialogHeaderTitle variant='h4'>{groupName} 조를 선택해 주세요.</DialogHeaderTitle>
      </DialogHeader>

      <DialogContent>
        <S.Top>
          선택된 팀: <b>{selectedCount}</b> 명
        </S.Top>
        <S.List>
          {list
            ? list.map((team, index) => {
                return (
                  <React.Fragment key={team.teamId}>
                    <ListTeamItem
                      id={team.teamId}
                      name={team.name}
                      emblem={team.emblem}
                      disabled={team.disabled}
                      selected={team.selected}
                      colorIndex={index}
                      onClickTeam={() => handleClickTeam(team)}
                    />
                  </React.Fragment>
                );
              })
            : ''}
        </S.List>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTeamSelect;
