import requestAPI from '@/utils/api';

const API_URL = '/teams';

export const getTeam = (id: number | string): Promise<ITeam[]> => requestAPI.get(`${API_URL}/get/${id}`);

export const listTeam = (page: number, itemPerPage: number): Promise<IListTeamResponse> =>
  requestAPI.get(`${API_URL}/list`, { params: { page, itemPerPage } });

export const addTeam = (data: ITeamFormInput): Promise<TDefaultReturn> => requestAPI.post(`${API_URL}/create`, data);

export const editTeam = (data: IUpdateTeamDto): Promise<TDefaultReturn> =>
  requestAPI.patch(`${API_URL}/update${data.teamId}`, data);

export const removeTeam = (id: number): Promise<void> => requestAPI.delete(`${API_URL}/${id}`);
