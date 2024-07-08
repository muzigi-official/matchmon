import { COLOR_SET } from '@/constant/DefaultSetting';

import { List, ListItem, Emblem, EmptyEmblem } from './ParticipateTeamList.styles';

interface IPrps {
  teams: IJoinCompTeam[];
}

export default function TeamList({ teams }: IPrps) {
  return (
    <List>
      {teams.map(team => {
        return (
          <ListItem key={team.joinCompId} color={COLOR_SET[team.teamId % COLOR_SET.length]}>
            <span>
              {team.emblem ? (
                <Emblem>
                  <img src={team.emblem} alt={team.name} />
                </Emblem>
              ) : (
                <EmptyEmblem src='/empty_emblem.png' alt='No Emblem' />
              )}
            </span>
            <span>{team.name}</span>
          </ListItem>
        );
      })}
    </List>
  );
}
