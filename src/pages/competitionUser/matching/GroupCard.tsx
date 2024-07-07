import * as S from './GroupCard.styles';

interface IGroupCardProps {
  name?: string;
  teams?: ITeam[];
  isAddButton?: boolean;
  onAddTeam?: () => void;
}

const GroupCard = ({ name, teams = [], isAddButton, onAddTeam }: IGroupCardProps) => {
  if (isAddButton) {
    return (
      <S.GroupCardContainer onClick={onAddTeam}>
        <S.AddTeamButton>
          <S.AddIcon>+</S.AddIcon>
        </S.AddTeamButton>
      </S.GroupCardContainer>
    );
  }

  return (
    <S.GroupCardContainer>
      <S.GroupHeader>
        {name}
        {teams.length > 0 && <S.RemoveButton>−</S.RemoveButton>}
      </S.GroupHeader>
      <S.GroupTeams>
        {teams.map(team => (
          <S.Team key={team.id} color=''>
            <span>
              <S.Emblem src={team.emblem} alt={team.name} />
            </span>
            <span>{team.name}</span>
          </S.Team>
        ))}
      </S.GroupTeams>
    </S.GroupCardContainer>
  );
};

export default GroupCard;
