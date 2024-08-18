import { useParams } from 'react-router-dom';

import BasicSelect from '@/components/common/Select/BasicSelect';
import { useMatchSchedulesQuery } from '@/hooks/queries/useMatchScheduleQuery';
import useCompetitionStore from '@/store/useCompetitionStore';

import ScoreBoard from './ScoreBoard';
import * as S from './Details.styles';

export default function MatchReportDetail() {
  const { matchId } = useParams();

  const { selectedCompetition } = useCompetitionStore();
  const { data: matchSchedules } = useMatchSchedulesQuery(selectedCompetition || 0);

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
        <ScoreBoard />
      </S.Content>
    </S.Container>
  );
}
