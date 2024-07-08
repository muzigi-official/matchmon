import GroupCard from './GroupCard';
import * as S from './GroupList.styles';

interface IGroup {
  id: number;
  name: string;
  teams: ITeam[];
}

interface GroupListProps {
  groups: IGroup[];
  onAddGroup: () => void;
}

const GroupList = ({ groups, onAddGroup }: GroupListProps) => {
  return (
    <S.GroupListContainer>
      {groups.map(group => (
        <GroupCard key={group.id} name={group.name} teams={group.teams} />
      ))}
      <GroupCard isAddButton onAddTeam={onAddGroup} />
    </S.GroupListContainer>
  );
};

export default GroupList;
