import requestAPI from '@/utils/api';

const API_URL = '/competitions';

export const getCompetition = (competitionId: number | string): Promise<ICompetition> =>
  requestAPI.get(`${API_URL}/get/${competitionId}`);

export const listCompetition = (page: number): Promise<IListCompetitionResponse> => {
  return requestAPI.get(`${API_URL}/list`, { params: { page } });
};

export const addCompetition = (data: ICompetitionFormInput): Promise<TDefaultReturn> =>
  requestAPI.post(`${API_URL}/create`, { ...data, poster: '', description: '' });

export const applyCompetition = (data: IApplyCompetitionDto): Promise<TDefaultReturn> =>
  requestAPI.post(`${API_URL}/apply`, data);
