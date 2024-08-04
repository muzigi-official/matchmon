import requestAPI from '@/utils/api';

const API_URL = '/players';

export const getPlayer = (id: number | string): Promise<IGetPlayerResponse[]> =>
  requestAPI.get(`${API_URL}/get`, { params: { id } });

export const listPlayer = (page: number): Promise<IListPlayerResponse> => {
  return requestAPI.get(`${API_URL}/list`, { params: { page } });
};

export const addPlayer = (data: ICreatePlayerDto): Promise<TDefaultReturn> =>
  requestAPI.post(`${API_URL}/create`, data);

export const editPlayer = (id: number, data: IUpdatePlayerDto): Promise<TDefaultReturn> =>
  requestAPI.patch(`${API_URL}/${id}`, data);

export const removePlayer = (id: number): Promise<IListPlayerResponse> => requestAPI.delete(`${API_URL}/delete, ${id}`);
