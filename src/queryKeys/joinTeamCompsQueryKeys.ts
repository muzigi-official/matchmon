export const joinTeamCompsQueryKeys = {
  participateTeams: (competitionId: number | string) => ['PARTICIPATE_TEAMS', competitionId],
  participatePlayers: (participantId: number | string) => ['PARTICIPATE_PLAYERS', participantId],
  participateTeamInPlayers: (participantId: number | string) => ['PARTICIPATE_TEAM_IN_PLAYERS', participantId],
};
