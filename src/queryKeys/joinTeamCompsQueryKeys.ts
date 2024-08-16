export const joinTeamCompsQueryKeys = {
  participateTeams: (competitionId: number | string) => ['PARTICIPATE_TEAMS', competitionId],
  participatePlayers: (joinTeamCompId: number | string) => ['PARTICIPATE_PLAYERS', joinTeamCompId],
  participateTeamInPlayers: (joinTeamCompId: number | string) => ['PARTICIPATE_TEAM_IN_PLAYERS', joinTeamCompId],
};
