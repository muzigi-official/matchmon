import { useParams } from 'react-router-dom';

import BasicSelect from '@/components/common/Select/BasicSelect';

import { useMatchSchedulesQuery } from '@/hooks/queries/useMatchScheduleQuery';
import { useParticipatePlayersQuery } from '@/hooks/queries/useJoinCompTeamQuery'; // 대회에 참여한 선수 정보를 가져오는 훅

import useCompetitionStore from '@/store/useCompetitionStore';

import ScoreBoard from './ScoreBoard';
import * as S from './Details.styles';

export default function MatchReportDetail() {
  const { matchId } = useParams();

  const { selectedCompetition } = useCompetitionStore();
  const { data: matchSchedules } = useMatchSchedulesQuery(selectedCompetition || 0);

  // 선택한 경기 정보 찾기
  const selectedMatch = matchSchedules?.find(match => match.id === Number(matchId));

  // 팀의 joinTeamCompId 가져오기 (대회에 참가한 팀과 관련된 ID)
  const homeTeamId = selectedMatch?.homeTeamId || 0;
  const awayTeamId = selectedMatch?.awayTeamId || 0;

  // 대회에 참여한 선수 정보 가져오기
  const { data: rawHomeTeamPlayers } = useParticipatePlayersQuery(homeTeamId);
  const { data: rawAwayTeamPlayers } = useParticipatePlayersQuery(awayTeamId);

  // 선수 정보를 원하는 구조로 변환
  const homeTeamPlayers =
    rawHomeTeamPlayers?.map(player => ({
      id: player.id ?? 0,
      name: player.nickName,
      uniformNumber: player.uniformNumber ?? 0,
      goals: 0, // 초기값을 0으로 설정
    })) || [];

  const awayTeamPlayers =
    rawAwayTeamPlayers?.map(player => ({
      id: player.id ?? 0,
      name: player.nickName,
      uniformNumber: player.uniformNumber ?? 0,
      goals: 0, // 초기값을 0으로 설정
    })) || [];

  const matchSelectOption =
    matchSchedules?.map(match => ({
      value: match.id ?? 0,
      text: `${match.matchTime} ${match.homeTeamName} vs ${match.awayTeamName}`,
    })) || [];

  const handleSelect = (option: ISelectProperty) => {
    console.log('select', option.value);
  };

  return (
    <S.Container>
      <S.Top>
        <h3>경기 기록</h3>
        <BasicSelect
          label='경기'
          name='match'
          value={Number(matchId)}
          options={matchSelectOption}
          onSelect={handleSelect}
        ></BasicSelect>
      </S.Top>
      <S.Content>
        <ScoreBoard homeTeamPlayers={homeTeamPlayers} awayTeamPlayers={awayTeamPlayers} />
      </S.Content>
    </S.Container>
  );
}
