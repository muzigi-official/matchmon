import RemoveIcon from '@mui/icons-material/Remove';

import Button from '@/components/common/Button';
import FormSelect from '@/components/common/Select/FormSelect';

import * as S from './Index.style';

interface IMatchFieldProps {
  match: IMatchSchedule;
  index: number;
  teamOptions: ISelectProperty[];
  stadiumOptions: ISelectProperty[];
  onMatchChange: (index: number, field: keyof IMatchSchedule, value: string | number) => void;
  onRemove: (index: number) => void;
}

const MatchField = ({ match, index, teamOptions, stadiumOptions, onMatchChange, onRemove }: IMatchFieldProps) => {
  return (
    <S.MatchItem key={index}>
      <input type='time' value={match.matchTime} onChange={e => onMatchChange(index, 'matchTime', e.target.value)} />
      <FormSelect
        name='stadium'
        value={match.stadium}
        onChange={value => onMatchChange(index, 'stadium', value)}
        options={stadiumOptions}
        onBlur={() => {}}
      />
      <FormSelect
        name='homeTeam'
        value={match.homeTeamId}
        onChange={value => onMatchChange(index, 'homeTeamId', value)}
        options={teamOptions}
        onBlur={() => {}}
      />
      <FormSelect
        name='awayTeam'
        value={match.awayTeamId}
        onChange={value => onMatchChange(index, 'awayTeamId', value)}
        options={teamOptions}
        onBlur={() => {}}
      />
      <Button variant='fab' color='danger' onClick={() => onRemove(index)}>
        <RemoveIcon />
      </Button>
    </S.MatchItem>
  );
};

export default MatchField;
