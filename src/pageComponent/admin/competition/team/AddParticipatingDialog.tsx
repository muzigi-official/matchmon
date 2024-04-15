import { useEffect, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import CloseIcon from '@mui/icons-material/Close';

import {
  DialogHeader,
  DialogHeaderTitle,
  DialogHeaderBody,
  DialogContent,
  DialogCloseButton,
} from '@/components/dialog/Dialog.style';

import * as S from './AddParticipatingDialog.style';

interface Props {
  open: boolean;
  players: Player[];
  onClose: () => void;
  onConfirm?: (formData: ApplyFormInput) => void;
}

export default function AddParticipatingPlayer({ open, players, onClose }: Props) {
  const [selectedCount, setSelectedCount] = useState<number>(players.filter(player => player.isAttend).length);
  useEffect(() => {
    console.log('open', open);
    console.log('players', players);
  }, [open]);

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
        <div>
          <h5>{selectedCount}</h5>
        </div>
        <S.List>
          {players.map(player => {
            return (
              <S.ListItem key={player.id} isAttend={player.isAttend}>
                {player.nickName}
              </S.ListItem>
            );
          })}
        </S.List>
      </DialogContent>
    </Dialog>
  );
}
