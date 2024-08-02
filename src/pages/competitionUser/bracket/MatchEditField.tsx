import RemoveIcon from '@mui/icons-material/Remove';
import EditIcon from '@mui/icons-material/Edit';

import Button from '@/components/common/Button';
import FormSelect from '@/components/common/Select/FormSelect';

import * as S from './Index.style';

interface IMatchFieldProps {
  match: IMatchScheduleDto;
  teamOptions: ISelectProperty[];
  stadiumOptions: ISelectProperty[];
  onMatchChange: (id: number, field: keyof IMatchScheduleDto, value: string | number) => void;
  onUpdate: (match: IMatchScheduleDto) => void;
  onRemove: (match: IMatchScheduleDto) => void;
}

const MatchEditField = ({
  match,
  teamOptions,
  stadiumOptions,
  onMatchChange,
  onUpdate,
  onRemove,
}: IMatchFieldProps) => {
  if (match.id === undefined) {
    return null; // match.id가 undefined인 경우 컴포넌트를 렌더링하지 않음
  }

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

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('matchTime: ', match.id, e.target.value);
    if (match.id !== undefined) {
      onMatchChange(match.id, 'matchTime', e.target.value);
    }
  };

  return (
    <S.MatchItem key={match.id}>
      <input type='time' value={match.matchTime || ''} onChange={handleTimeChange} />
      <FormSelect
        name='stadium'
        value={match.stadium}
        onChange={value => onMatchChange(match.id!, 'stadium', value)}
        options={stadiumOptions}
        onBlur={() => {}}
      />
      <FormSelect
        name='homeTeam'
        value={match.homeTeamId}
        onChange={value => onMatchChange(match.id!, 'homeTeamId', value)}
        options={teamOptions}
        onBlur={() => {}}
      />
      <FormSelect
        name='awayTeam'
        value={match.awayTeamId}
        onChange={value => onMatchChange(match.id!, 'awayTeamId', value)}
        options={teamOptions}
        onBlur={() => {}}
      />
      <Button variant='outlined' color='grey' onClick={handleUpdate}>
        <EditIcon />
      </Button>
      <Button variant='outlined' color='danger' onClick={() => onRemove(match)}>
        <RemoveIcon />
      </Button>
    </S.MatchItem>
  );
};

export default MatchEditField;
