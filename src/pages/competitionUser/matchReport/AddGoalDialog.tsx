import { useState } from 'react';
import toast from 'react-hot-toast';

import Loading from '@/components/common/Loading';
import { useParticipatePlayersQuery } from '@/hooks/queries/useJoinCompTeamQuery';
import { useCreateGoalMutation } from '@/hooks/queries/useMatchResultQuery';

import * as S from './AddGoalDialog.styles';

interface ITeamInfo {
  participantId: number;
  teamId: number;
  name: string;
}

interface IAddGoalDialogProps {
  competitionId: number;
  matchId: number;
  home: ITeamInfo;
  away: ITeamInfo;
  onClose: () => void;
}

const EVENT_OPTIONS: { value: TGoalEvent; label: string; warn?: boolean }[] = [
  { value: 'GOAL', label: '일반' },
  { value: 'PENALTY', label: '페널티' },
  { value: 'OWN_GOAL', label: '자책(OG)', warn: true },
];

export default function AddGoalDialog({ competitionId, matchId, home, away, onClose }: IAddGoalDialogProps) {
  const [side, setSide] = useState<'home' | 'away'>('home');
  const [playerId, setPlayerId] = useState<number | null>(null);
  const [minute, setMinute] = useState<string>('');
  const [event, setEvent] = useState<TGoalEvent>('GOAL');

  const team = side === 'home' ? home : away;
  const { data: players = [], isLoading } = useParticipatePlayersQuery(competitionId, team.participantId);
  const createGoal = useCreateGoalMutation(competitionId, matchId);

  const handleSelectSide = (next: 'home' | 'away') => {
    setSide(next);
    setPlayerId(null);
  };

  const handleSubmit = () => {
    if (!playerId) {
      toast.error('득점 선수를 선택하세요.');
      return;
    }
    createGoal.mutate(
      {
        playerId,
        teamId: team.teamId,
        minute: minute ? Number(minute) : undefined,
        event,
      },
      {
        onSuccess: () => {
          toast.success('득점이 추가되었습니다.');
          onClose();
        },
        onError: () => {
          toast.error('득점 추가 중 오류가 발생했습니다.');
        },
      },
    );
  };

  return (
    <S.Overlay onClick={onClose}>
      <S.Modal onClick={e => e.stopPropagation()}>
        <S.Header>
          <S.Title>득점 추가</S.Title>
          <S.Close onClick={onClose}>✕</S.Close>
        </S.Header>

        {/* 팀 선택 */}
        <S.Field>
          <S.Label>① 팀</S.Label>
          <S.TeamTabs>
            <S.TeamTab $active={side === 'home'} onClick={() => handleSelectSide('home')}>
              {home.name} (홈)
            </S.TeamTab>
            <S.TeamTab $active={side === 'away'} onClick={() => handleSelectSide('away')}>
              {away.name} (원정)
            </S.TeamTab>
          </S.TeamTabs>
        </S.Field>

        {/* 선수 선택 */}
        <S.Field>
          <S.Label>② 선수</S.Label>
          <S.PlayerList>
            {isLoading ? (
              <Loading />
            ) : players.length === 0 ? (
              <S.Empty>참가 선수가 없습니다.</S.Empty>
            ) : (
              players.map(player => {
                const selected = player.id === playerId;
                return (
                  <S.PlayerRow
                    key={player.id}
                    $selected={selected}
                    onClick={() => setPlayerId(player.id ?? null)}
                  >
                    <S.Num $selected={selected}>{player.uniformNumber ?? '-'}</S.Num>
                    <S.PlayerLabel $selected={selected}>{player.nickName}</S.PlayerLabel>
                    {selected && <S.Check>✓</S.Check>}
                  </S.PlayerRow>
                );
              })
            )}
          </S.PlayerList>
        </S.Field>

        <S.InlineRow>
          {/* 분 */}
          <S.Field style={{ flex: '0 0 auto' }}>
            <S.Label>③ 분</S.Label>
            <S.MinuteInput
              type='number'
              min={0}
              placeholder='예: 12'
              value={minute}
              onChange={e => setMinute(e.target.value)}
            />
          </S.Field>

          {/* 종류 */}
          <S.Field style={{ flex: 1 }}>
            <S.Label>④ 종류</S.Label>
            <S.EventPills>
              {EVENT_OPTIONS.map(opt => (
                <S.EventPill
                  key={opt.value}
                  $active={event === opt.value}
                  $warn={opt.warn}
                  onClick={() => setEvent(opt.value)}
                >
                  {opt.label}
                </S.EventPill>
              ))}
            </S.EventPills>
          </S.Field>
        </S.InlineRow>

        <S.Submit onClick={handleSubmit} disabled={createGoal.isLoading || !playerId}>
          추가
        </S.Submit>
      </S.Modal>
    </S.Overlay>
  );
}
