import requestAPI from '@/utils/api';

// 득점 랭킹. :id는 competitionId. 자책골 제외.
export const fetchScorers = (competitionId: number): Promise<IScorerDto[]> => {
  return requestAPI.get(`/competitions/${competitionId}/scorers`);
};
