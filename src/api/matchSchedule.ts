import requestAPI from '@/utils/api';

const API_URL = '/match-schedules';

export const fetchMatchSchedules = (competitionId: number): Promise<IMatchScheduleDto[]> =>
  requestAPI.get(`${API_URL}?competitionId=${competitionId}`);

export const createMatchSchedule = (data: IMatchSchedule): Promise<IMatchSchedule> => requestAPI.post(API_URL, data);

export const createMatchSchedules = (data: IMatchScheduleDto[]): Promise<IMatchSchedule[]> =>
  requestAPI.post(`${API_URL}/bulk`, data);

export const updateMatchSchedule = (data: IMatchScheduleDto): Promise<IMatchSchedule> =>
  requestAPI.put(`${API_URL}/${data.id}`, data);

export const deleteMatchSchedule = (id: number): Promise<void> => requestAPI.delete(`${API_URL}/${id}`);

export const deleteMatchSchedulesByCompetitionId = (competitionId: number): Promise<void> =>
  requestAPI.delete(`${API_URL}/competition/${competitionId}`);
