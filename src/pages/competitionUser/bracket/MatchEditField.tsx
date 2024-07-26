import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@/components/common/Button';
import FormSelect from '@/components/common/Select/FormSelect';

import * as S from './Index.style';

interface IMatchFieldProps {
  match: IMatchScheduleDto;
  index: number;
  teamOptions: ISelectProperty[];
  stadiumOptions: ISelectProperty[];
  onMatchChange: (index: number, field: keyof IMatchScheduleDto, value: string | number) => void;
  onUpdate: (match: IMatchScheduleDto) => void;
  onRemove: (index: number) => void;
}

const MatchEditField = ({
  match,
  index,
  teamOptions,
  stadiumOptions,
  onMatchChange,
  onUpdate,
  onRemove,
}: IMatchFieldProps) => {
  console.log(match);
  const handleUpdate = () => {
    const updatedMatch: IMatchScheduleDto = {
      id: match.id,
      matchTime: match.matchTime,
      stadium: match.stadium,
      homeTeamId: match.homeTeamId,
      awayTeamId: match.awayTeamId,
      homeTeamName: match.homeTeamName,
      awayTeamName: match.awayTeamName,
    };
    onUpdate(updatedMatch);
  };
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
      <Button variant='fab' color='grey' onClick={handleUpdate}>
        <EditIcon />
      </Button>
      <Button variant='fab' color='danger' onClick={() => onRemove(index)}>
        <RemoveIcon />
      </Button>
    </S.MatchItem>
  );
};

export default MatchEditField;
