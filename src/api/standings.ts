import requestAPI from '@/utils/api';

// 조별 순위. :id는 competitionId (과거 tournamentId 혼동 정리됨, 2026-10-16)
export const fetchStandings = (competitionId: number, groupLabel: string): Promise<IStandingsDto> => {
  return requestAPI.get(`/competitions/${competitionId}/standings`, { params: { groupLabel } });
};
