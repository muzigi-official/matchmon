import customAxios from '@/api/remove_customAxios';

export async function addPlayer(data: ICreatePlayerDto) {
  const response = await customAxios.post<TDefaultReturn>('/players/create', data);
  return response;
}

export async function editPlayer(id: number, data: IUpdatePlayerDto) {
  const response = await customAxios.patch<TDefaultReturn>(`/players/${id}`, data);
  return response;
}
export async function getPlayer(id: number | string) {
  const params = { id };
  const response = await customAxios.get<IGetPlayerResponse>('/players/get', { params });
  return response.data;
}
export async function listPlayer(page: number) {
  const params = { page };
  const response = await customAxios.get<IListPlayerResponse>('/players/list', { params });
  return response.data;
}

export async function removePlayer(id: number) {
  const response = await customAxios.delete<IListPlayerResponse>(`/players/delete, ${id}`);
  return response;
}
