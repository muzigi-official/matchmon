export const matchResultQueryKeys = {
  result: (competitionId: number, matchId: number) => ['matchResult', competitionId, matchId],
  list: (competitionId: number) => ['matchResultList', competitionId],
};
