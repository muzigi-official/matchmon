import ListTeamItem from '@/components/team/ListItem';
import * as S from './GroupCard.styles';
import React from 'react';

interface IGroupCardProps {
  name?: string;
  teams?: IJoinCompTeam[];
  isAddButton?: boolean;
  onAddTeam?: () => void;
  onClick?: () => void; // 그룹 카드 클릭 이벤트
  onRemove?: (event: React.MouseEvent) => void;
}

const GroupCard = ({ name, teams = [], isAddButton, onAddTeam, onClick, onRemove }: IGroupCardProps) => {
  if (isAddButton) {
    return (
      <S.GroupIconContainer>
        <S.AddTeamButton onClick={onAddTeam}>
          <S.AddIcon>+</S.AddIcon>
        </S.AddTeamButton>
      </S.GroupIconContainer>
    );
  }

  return (
    <S.GroupCardContainer onClick={onClick}>
      <S.GroupHeader>
        {`${name}조`}
        {teams.length === 0 && (
          <S.RemoveButton
            onClick={event => {
              event.stopPropagation(); // Prevent event bubbling
              onRemove && onRemove(event);
            }}
          >
            −
          </S.RemoveButton>
        )}
      </S.GroupHeader>
      <S.GroupTeams>
        {teams.length === 0 ? (
          <S.NoTeamsMessage>팀을 추가해 주세요</S.NoTeamsMessage>
        ) : (
          teams.map((team, index) => (
            <React.Fragment key={team.id}>
              <ListTeamItem id={team.id} name={team.name} emblem={team.emblem} colorIndex={team.id || index} />
            </React.Fragment>
          ))
        )}
      </S.GroupTeams>
    </S.GroupCardContainer>
  );
};

export default GroupCard;
