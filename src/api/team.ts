import requestAPI from '@/utils/api';

const API_URL = '/teams';

export const getTeam = (id: number | string): Promise<ITeam[]> => requestAPI.get(`${API_URL}/get/${id}`);

export const listTeam = (page: number, itemPerPage: number): Promise<IListTeamResponse> => {
  const params = { page, itemPerPage };
  return requestAPI.get(`${API_URL}/list`, { params });
};

export const addTeam = (data: ICreateTeamDto): Promise<TDefaultReturn> => requestAPI.post(`${API_URL}/create`, data);

export const editTeam = (data: IUpdateTeamDto): Promise<TDefaultReturn> =>
  requestAPI.patch(`${API_URL}/update${data.teamId}`, data);

export const removeTeam = (id: number): Promise<IListTeamResponse> => requestAPI.delete(`${API_URL}/remove, ${id}`);
