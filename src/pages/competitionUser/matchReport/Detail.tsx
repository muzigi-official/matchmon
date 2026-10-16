import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import Loading from '@/components/common/Loading';
import BasicSelect from '@/components/common/Select/BasicSelect';
import { useParticipateTeamsQuery } from '@/hooks/queries/useJoinCompTeamQuery';
import {
  useMatchResult,
  useMatchResultsList,
  useCreateMatchResult,
  useUpdateMatchResult,
  useDeleteGoalMutation,
} from '@/hooks/queries/useMatchResultQuery';
import useCompetitionStore from '@/store/useCompetitionStore';

import AddGoalDialog from './AddGoalDialog';

import * as D from './Details.styles';
import * as S from './MatchResultForm.styles';

const computeResult = (home: number, away: number): TMatchResult => {
  if (home > away) return 'HOME_WIN';
  if (home < away) return 'AWAY_WIN';
  return 'DRAW';
};

export default function MatchReportDetail() {
  const { matchId } = useParams();
  const { selectedCompetition } = useCompetitionStore();
  const competitionId = selectedCompetition || 0;
  const selectedMatchId = Number(matchId) || 0;

  const { data: matchResults } = useMatchResultsList(competitionId);
  const { data: result, isLoading } = useMatchResult(competitionId, selectedMatchId);

  const createMutation = useCreateMatchResult(competitionId, selectedMatchId);
  const updateMutation = useUpdateMatchResult(competitionId, selectedMatchId);
  const deleteGoalMutation = useDeleteGoalMutation(competitionId, selectedMatchId);

  // participantId → teamId 매핑용 참가팀 목록
  const { data: participants = [] } = useParticipateTeamsQuery(competitionId);
  const [isGoalDialogOpen, setGoalDialogOpen] = useState(false);

  const findTeamId = (participantId?: number) =>
    participants.find(p => p.id === participantId)?.team?.id ?? 0;

  // 입력 상태 (조회 결과로 초기화)
  const [homeScore, setHomeScore] = useState(0);
  const [awayScore, setAwayScore] = useState(0);
  const [state, setState] = useState<TMatchResultState>('WAITING');
  const [isPenalty, setIsPenalty] = useState(false);
  const [homePk, setHomePk] = useState<number>(0);
  const [awayPk, setAwayPk] = useState<number>(0);

  useEffect(() => {
    if (result) {
      setHomeScore(result.homeScore ?? 0);
      setAwayScore(result.awayScore ?? 0);
      setState(result.state ?? 'WAITING');
      setIsPenalty(result.isPenaltyShootout ?? false);
      setHomePk(result.homePenaltyScore ?? 0);
      setAwayPk(result.awayPenaltyScore ?? 0);
    }
  }, [result]);

  const matchSelectOption =
    matchResults?.map(mr => ({
      value: mr.match.id ?? 0,
      text: `${mr.match.matchTime} ${mr.match.homeParticipantName ?? ''} vs ${mr.match.awayParticipantName ?? ''}`,
    })) || [];

  const handleSelect = (option: ISelectProperty) => {
    // 경기 선택 시 라우트 이동 (상위 목록에서 들어온 흐름과 동일 경로 유지)
    window.location.href = `/competition/results/${option.value}`;
  };

  const handleSave = () => {
    const payload: ICreateMatchResultDto = {
      homeScore,
      awayScore,
      result: computeResult(homeScore, awayScore),
      state,
      isPenaltyShootout: isPenalty,
      homePenaltyScore: isPenalty ? homePk : null,
      awayPenaltyScore: isPenalty ? awayPk : null,
    };
    const isNew = !result || result.state === 'WAITING';
    const mutation = isNew ? createMutation : updateMutation;
    mutation.mutate(payload, {
      onSuccess: () => {
        toast.success('경기 결과가 저장되었습니다.');
      },
      onError: () => {
        toast.error('저장 중 오류가 발생했습니다.');
      },
    });
  };

  const handleDeleteGoal = (goalId: number) => {
    deleteGoalMutation.mutate(goalId);
  };

  const homeTeamId = result?.match.homeParticipantId;

  return (
    <D.Container>
      <D.Top>
        <h3>경기 입력창</h3>
        <BasicSelect
          label='경기'
          name='match'
          value={selectedMatchId}
          options={matchSelectOption}
          onSelect={handleSelect}
        />
      </D.Top>

      {isLoading || !result ? (
        <Loading />
      ) : (
        <S.Stack>
          {/* 스코어보드 */}
          <S.Card>
            <S.ScoreBoard>
              <S.StateBadge $state={state}>● {state}</S.StateBadge>

              <S.TeamSide>
                <S.TeamName>{result.match.homeParticipantName}</S.TeamName>
                <S.ScoreControl>
                  <S.StepButton onClick={() => setHomeScore(v => Math.max(0, v - 1))} disabled={homeScore <= 0}>
                    −
                  </S.StepButton>
                  <S.ScoreValue>{homeScore}</S.ScoreValue>
                  <S.StepButton $primary onClick={() => setHomeScore(v => v + 1)}>
                    +
                  </S.StepButton>
                </S.ScoreControl>
              </S.TeamSide>

              <S.Colon>:</S.Colon>

              <S.TeamSide>
                <S.TeamName>{result.match.awayParticipantName}</S.TeamName>
                <S.ScoreControl>
                  <S.StepButton onClick={() => setAwayScore(v => Math.max(0, v - 1))} disabled={awayScore <= 0}>
                    −
                  </S.StepButton>
                  <S.ScoreValue>{awayScore}</S.ScoreValue>
                  <S.StepButton $primary onClick={() => setAwayScore(v => v + 1)}>
                    +
                  </S.StepButton>
                </S.ScoreControl>
              </S.TeamSide>
            </S.ScoreBoard>

            <S.OptionRow style={{ marginTop: 20 }}>
              <S.OptionGroup>
                <S.OptionLabel>상태</S.OptionLabel>
                <S.Pills>
                  <S.Pill $active={state === 'COMPLETED'} onClick={() => setState('COMPLETED')}>
                    완료
                  </S.Pill>
                  <S.Pill $active={state === 'PENDING_RESULT'} onClick={() => setState('PENDING_RESULT')}>
                    결과대기
                  </S.Pill>
                  <S.Pill $active={state === 'WAITING'} onClick={() => setState('WAITING')}>
                    대기
                  </S.Pill>
                </S.Pills>
              </S.OptionGroup>

              <S.OptionGroup>
                <S.OptionLabel>승부차기</S.OptionLabel>
                <S.Pills>
                  <S.Pill $active={!isPenalty} onClick={() => setIsPenalty(false)}>
                    없음
                  </S.Pill>
                  <S.Pill $active={isPenalty} onClick={() => setIsPenalty(true)}>
                    있음
                  </S.Pill>
                </S.Pills>
                {isPenalty && (
                  <S.PenaltyScores>
                    <S.PenaltyInput
                      type='number'
                      value={homePk}
                      onChange={e => setHomePk(Number(e.target.value))}
                    />
                    <span>:</span>
                    <S.PenaltyInput
                      type='number'
                      value={awayPk}
                      onChange={e => setAwayPk(Number(e.target.value))}
                    />
                  </S.PenaltyScores>
                )}
              </S.OptionGroup>
            </S.OptionRow>
          </S.Card>

          {/* 득점 기록 */}
          <S.Card>
            <S.SectionHeader>
              <S.SectionTitle>득점 기록</S.SectionTitle>
              <S.AddGoalButton onClick={() => setGoalDialogOpen(true)}>+ 득점 추가</S.AddGoalButton>
            </S.SectionHeader>

            {result.goals.length === 0 ? (
              <S.Empty>아직 득점 기록이 없습니다.</S.Empty>
            ) : (
              <S.GoalList>
                {result.goals.map(goal => {
                  const isHome = goal.teamId === homeTeamId;
                  return (
                    <S.GoalItem key={goal.id}>
                      <S.TeamDot $home={isHome} />
                      <S.Minute>{goal.minute}&apos;</S.Minute>
                      <S.PlayerName>
                        {goal.playerName}
                        {goal.uniformNumber !== null ? ` (#${goal.uniformNumber})` : ''}
                      </S.PlayerName>
                      {goal.isOwnGoal && <S.OgTag>OG</S.OgTag>}
                      <S.TeamTag $home={isHome}>{goal.teamName}</S.TeamTag>
                      <S.DeleteGoalButton onClick={() => handleDeleteGoal(goal.id)}>✕</S.DeleteGoalButton>
                    </S.GoalItem>
                  );
                })}
              </S.GoalList>
            )}
          </S.Card>

          <S.SaveButton onClick={handleSave} disabled={createMutation.isLoading || updateMutation.isLoading}>
            결과 저장
          </S.SaveButton>

          {isGoalDialogOpen && (
            <AddGoalDialog
              competitionId={competitionId}
              matchId={selectedMatchId}
              home={{
                participantId: result.match.homeParticipantId,
                teamId: findTeamId(result.match.homeParticipantId),
                name: result.match.homeParticipantName,
              }}
              away={{
                participantId: result.match.awayParticipantId,
                teamId: findTeamId(result.match.awayParticipantId),
                name: result.match.awayParticipantName,
              }}
              onClose={() => setGoalDialogOpen(false)}
            />
          )}
        </S.Stack>
      )}
    </D.Container>
  );
}
