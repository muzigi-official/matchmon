import requestAPI from '@/utils/api';

// 경기 결과는 competitions/:competitionId/matches 하위로 통합됨 (2026-10-16 백엔드 라우트 정리)

// 경기+결과 통합 목록
export const fetchMatchResultsList = (competitionId: number): Promise<IMatchResultDto[]> => {
  return requestAPI.get(`/competitions/${competitionId}/matches`);
};

// 특정 경기 결과 단건 (스코어 + goals 포함)
export const fetchMatchResult = (competitionId: number, matchId: number): Promise<IMatchResultDto> => {
  return requestAPI.get(`/competitions/${competitionId}/matches/${matchId}/result`);
};

// 경기 결과 생성 (matchId는 URL 경로)
export const createMatchResult = (
  competitionId: number,
  matchId: number,
  data: ICreateMatchResultDto,
): Promise<IMatchResultDto> => {
  return requestAPI.post(`/competitions/${competitionId}/matches/${matchId}/result`, data);
};

// 경기 결과 수정
export const updateMatchResult = (
  competitionId: number,
  matchId: number,
  data: ICreateMatchResultDto,
): Promise<IMatchResultDto> => {
  return requestAPI.put(`/competitions/${competitionId}/matches/${matchId}/result`, data);
};

// 득점 추가
export const createGoal = (competitionId: number, matchId: number, data: ICreateGoalDto): Promise<IGoalInResult> => {
  return requestAPI.post(`/competitions/${competitionId}/matches/${matchId}/goals`, data);
};

// 득점 삭제
export const deleteGoal = (competitionId: number, matchId: number, goalId: number): Promise<void> => {
  return requestAPI.delete(`/competitions/${competitionId}/matches/${matchId}/goals/${goalId}`);
};
