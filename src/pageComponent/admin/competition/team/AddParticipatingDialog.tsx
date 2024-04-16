import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

import {
  DialogHeader,
  DialogHeaderTitle,
  DialogHeaderBody,
  DialogContent,
  DialogCloseButton,
  DialogFooter,
} from '@/components/dialog/Dialog.style';

import * as S from './AddParticipatingDialog.style';

interface Props {
  open: boolean;
  players: Player[];
  onClose: () => void;
  onClick: (player: Player) => void;
}

export default function AddParticipatingPlayer({ open, players, onClose, onClick }: Props) {
  const [list, setList] = useState<Player[]>(players);
  const [selectedCount, setSelectedCount] = useState<number>(list.filter(player => player.isAttend).length);

  useEffect(() => {
    setList(players);
    setSelectedCount(players.filter(player => player.isAttend).length);
  }, [players]);

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby='dialog-apply' aria-describedby='dialog-apply-description'>
      <DialogHeader id='dialog-title'>
        <DialogHeaderTitle variant='h4'>
          참가 신청서
          <DialogHeaderBody variant='body1'>대회에 참여할 선수를 선택해 주세요.</DialogHeaderBody>
        </DialogHeaderTitle>
      </DialogHeader>

      <DialogContent>
        <DialogCloseButton onClick={onClose}>
          <CloseIcon />
        </DialogCloseButton>
        <S.Top>
          <b>{selectedCount}</b>명 선택함
        </S.Top>
        <S.List>
          {players.map(player => {
            return (
              <S.ListItem key={player.id} isAttend={player.isAttend} onClick={() => onClick(player)}>
                <span>{player.nickName}</span>
                <span>{player.uniformNumber ? ` (${player.uniformNumber})` : ''}</span>
              </S.ListItem>
            );
          })}
        </S.List>
      </DialogContent>
      <DialogFooter />
    </Dialog>
  );
}
