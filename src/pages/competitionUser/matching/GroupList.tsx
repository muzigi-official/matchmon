import GroupCard from './GroupCard';
import * as S from './GroupList.styles';

interface GroupListProps {
  groups: IGroupStage[];
  onAddGroup: () => void;
}

const GroupList = ({ groups, onAddGroup }: GroupListProps) => {
  return (
    <S.GroupListContainer>
      {groups.map(group => (
        <GroupCard key={group.id} name={group.name} teams={group.joinTeamComps} />
      ))}
      <GroupCard isAddButton onAddTeam={onAddGroup} />
    </S.GroupListContainer>
  );
};

export default GroupList;
