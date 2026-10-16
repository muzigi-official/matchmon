import requestAPI from '@/utils/api';

const API_URL = '/match-results';

// 특정 matchScheduleId에 대한 경기 결과 가져오기
export const fetchMatchResult = (scheduleId: number): Promise<IMatchResultDto> => {
  return requestAPI.get(`${API_URL}/${scheduleId}/result`);
};

export const fetchMatchResultsList = (competitionId: number): Promise<IMatchResultDto[]> => {
  return requestAPI.get(`${API_URL}/competition/${competitionId}/results`);
};

// 경기 결과 생성하기
export const createMatchResult = (data: IMatchResultDto): Promise<IMatchResultDto> => {
  return requestAPI.post(API_URL, data);
};

// 경기 결과 업데이트하기
export const updateMatchResult = (scheduleId: number, data: IMatchResultDto): Promise<IMatchResultDto> => {
  return requestAPI.put(`${API_URL}/${scheduleId}`, data);
};
