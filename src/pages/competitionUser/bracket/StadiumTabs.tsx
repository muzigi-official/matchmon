import AddIcon from '@mui/icons-material/Add';

import Tabs from '@/components/common/Tabs';
import Button from '@/components/common/Button';

import MatchField from './MatchField';
import * as S from './Index.style';

interface IStadiumTabsProps {
  schedules: IMatchSchedule[];
  addMatch: () => void;
  removeMatch: (index: number) => void;
  handleMatchChange: (index: number, field: keyof IMatchSchedule, value: string) => void;
}

const StadiumTabs = ({ schedules, addMatch, removeMatch, handleMatchChange }: IStadiumTabsProps) => {
  const stadiums = Array.from(new Set(schedules.map(match => match.stadium)));

  const renderMatchFields = (filteredMatches: IMatchSchedule[]) => (
    <S.TimeTable>
      {filteredMatches.map((match, index) => (
        <MatchField key={index} match={match} index={index} onMatchChange={handleMatchChange} onRemove={removeMatch} />
      ))}
      <Button variant='fab' color='danger' onClick={addMatch}>
        <AddIcon />
      </Button>
    </S.TimeTable>
  );

  const tabs = [
    {
      label: '전체',
      content: renderMatchFields(schedules),
    },
    ...stadiums.map(stadium => ({
      label: stadium,
      content: renderMatchFields(schedules.filter(match => match.stadium === stadium)),
    })),
  ];

  return (
    <div>
      <Tabs tabs={tabs} />
    </div>
  );
};

export default StadiumTabs;
