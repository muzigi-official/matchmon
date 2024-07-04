import customAxios from '@/api/customAxios';

interface ICreatePlayerDto {
  nickName: string;
  picture?: string;
  uniformNumber?: number;
  teamId: number;
}

interface IUpdatePlayerDto {
  nickName: string;
  picture?: string;
  uniformNumber?: number;
  role: number;
}

interface IListPlayerResponse {
  data: IPlayer[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

interface IGetPlayerResponse {
  player: IPlayer;
}

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
