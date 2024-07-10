import React, { useState, useEffect } from 'react';
import Dialog from '@mui/material/Dialog';

import * as S from './DialogTeamSelect.styles';
import { DialogHeader, DialogHeaderTitle, DialogContent } from '@/components/common/dialog/Dialog.style';
import ListTeamItem from '@/components/team/ListItem';

interface TeamSelectPopupProps {
  open: boolean;
  teams: IJoinCompTeam[];
  groupName: string;
  onClick: (team: IJoinCompTeam) => void;
  onClose: () => void;
  onSave: () => void;
}

const DialogTeamSelect = ({ open, teams, groupName, onClick, onClose }: TeamSelectPopupProps) => {
  const [list, setList] = useState<IJoinCompTeam[]>(teams);
  const [selectedCount, setSelectedCount] = useState<number>(0);

  useEffect(() => {
    setList(teams);
    setSelectedCount(teams.filter(team => team.group !== '-').length);
  }, [teams]);

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
          {list.map(team => {
            return (
              <React.Fragment key={team.teamId}>
                <ListTeamItem
                  id={team.teamId}
                  name={team.name}
                  emblem={team.emblem}
                  onClickTeam={() => onClick(team)}
                />
              </React.Fragment>
            );
          })}
        </S.List>
      </DialogContent>
    </Dialog>
  );
};

export default DialogTeamSelect;
