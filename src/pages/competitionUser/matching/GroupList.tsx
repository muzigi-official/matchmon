import GroupCard from './GroupCard';

import * as S from './GroupList.styles';

interface IGroupListProps {
  groups: IGroupStage[];
  onAddGroup: () => void;
  onSelectGroup: (group: IGroupStage) => void;
  onRemoveGroup: (group: IGroupStage) => void;
}

const GroupList = ({ groups, onAddGroup, onSelectGroup, onRemoveGroup }: IGroupListProps) => {
  return (
    <S.GroupListContainer>
      {groups.map(group => (
        <GroupCard
          key={group.id}
          name={group.name}
          teams={group.joinTeamComps}
          onClick={() => onSelectGroup(group)}
          onRemove={() => onRemoveGroup(group)}
        />
      ))}
      <GroupCard isAddButton onAddTeam={onAddGroup} />
    </S.GroupListContainer>
  );
};

export default GroupList;
