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
  const handleAddTeam = (groupId: number) => {
    console.log(`Add team to group ${groupId}`);
    // 팀 추가 로직을 여기에 구현합니다.
  };

  return (
    <S.GroupListContainer>
      {groups.map(group => (
        <GroupCard key={group.id} name={group.name} teams={group.teams} onAddTeam={() => handleAddTeam(group.id)} />
      ))}
      <GroupCard isAddButton onAddTeam={onAddGroup} />
    </S.GroupListContainer>
  );
};

export default GroupList;
