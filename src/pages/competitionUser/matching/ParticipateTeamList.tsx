import ListTeamItem from '@/components/team/ListItem';

import React from 'react';
import { List } from './ParticipateTeamList.styles';

interface IPrps {
  teams: IJoinTeamComps[];
}

export default function TeamList({ teams }: IPrps) {
  return (
    <List>
      {teams.map(team => {
        return (
          <React.Fragment key={team.joinCompId}>
            <ListTeamItem id={team.joinCompId} colorIndex={team.joinCompId} name={team.name} emblem={team.emblem} />
          </React.Fragment>
        );
      })}
    </List>
  );
}
