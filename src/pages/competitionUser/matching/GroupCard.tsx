import ListTeamItem from '@/components/team/ListItem';
import * as S from './GroupCard.styles';
import React from 'react';

interface IGroupCardProps {
  name?: string;
  teams?: IJoinCompTeam[];
  isAddButton?: boolean;
  onAddTeam?: () => void;
}

const GroupCard = ({ name, teams = [], isAddButton, onAddTeam }: IGroupCardProps) => {
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
    <S.GroupCardContainer>
      <S.GroupHeader>
        {name}
        {teams.length > 0 && <S.RemoveButton>−</S.RemoveButton>}
      </S.GroupHeader>
      <S.GroupTeams>
        {teams
          ? teams.map((team, index) => (
              <React.Fragment key={team.id}>
                <ListTeamItem id={team.id} name={team.name} emblem={team.emblem} colorIndex={index} />
              </React.Fragment>
            ))
          : ''}
      </S.GroupTeams>
    </S.GroupCardContainer>
  );
};

export default GroupCard;
