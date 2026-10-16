import { useParams } from 'react-router-dom';

import BasicSelect from '@/components/common/Select/BasicSelect';

import { useMatchResultsList } from '@/hooks/queries/useMatchResultQuery';

import useCompetitionStore from '@/store/useCompetitionStore';

import * as S from './Details.styles';

export default function MatchReportDetail() {
  const { matchId } = useParams();

  const { selectedCompetition } = useCompetitionStore();
  const { data: matchResults } = useMatchResultsList(selectedCompetition || 0);

  // 선택한 경기 정보 찾기 (경기 정보는 matchSchedule 하위에 존재)
  // const selectedMatch = matchResults?.find(match => match.matchSchedule.id === Number(matchId));

  // NOTE: 결과 입력(ScoreBoard) / 저장 로직 연결은 경기 결과 입력 기능(P1)에서 구현한다.
  const matchSelectOption =
    matchResults?.map(matchResult => ({
      value: matchResult.match.id ?? 0,
      text: `${matchResult.match.matchTime} ${matchResult.match.homeParticipantName ?? ''} vs ${
        matchResult.match.awayParticipantName ?? ''
      }`,
    })) || [];

  const handleSelect = (option: ISelectProperty) => {
    console.log('select', option.value);
  };

  return (
    <S.Container>
      <S.Top>
        <h3>경기 입력창</h3>
        <BasicSelect
          label='경기'
          name='match'
          value={Number(matchId)}
          options={matchSelectOption}
          onSelect={handleSelect}
        ></BasicSelect>
      </S.Top>
      <S.Content>{/* 결과 입력 ScoreBoard는 P1에서 연결 */}</S.Content>
    </S.Container>
  );
}
