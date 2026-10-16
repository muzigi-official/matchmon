export const standingsQueryKeys = {
  standings: (competitionId: number, groupLabel: string) => ['standings', competitionId, groupLabel],
  scorers: (competitionId: number) => ['scorers', competitionId],
};
