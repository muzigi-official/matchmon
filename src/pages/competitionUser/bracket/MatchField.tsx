import Button from '@/components/common/Button';
import * as S from './Index.style';

interface IMatchFieldProps {
  match: IMatchSchedule;
  index: number;
  onMatchChange: (index: number, field: keyof IMatchSchedule, value: string) => void;
  onRemove: (index: number) => void;
}

const MatchField = ({ match, index, onMatchChange, onRemove }: IMatchFieldProps) => {
  return (
    <S.MatchItem key={index}>
      <input type='time' value={match.time} onChange={e => onMatchChange(index, 'time', e.target.value)} />
      <input
        type='text'
        value={match.stadium}
        placeholder='구장'
        onChange={e => onMatchChange(index, 'stadium', e.target.value)}
      />
      <input
        type='text'
        value={match.homeTeam}
        placeholder='홈팀'
        onChange={e => onMatchChange(index, 'homeTeam', e.target.value)}
      />
      <input
        type='text'
        value={match.awayTeam}
        placeholder='어웨이팀'
        onChange={e => onMatchChange(index, 'awayTeam', e.target.value)}
      />
      <Button onClick={() => onRemove(index)}>삭제</Button>
    </S.MatchItem>
  );
};

export default MatchField;
