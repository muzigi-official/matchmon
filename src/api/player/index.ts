import customAxios from '@/api/customAxios';

type DefaultReturn = string;

interface CreatePlayerDto {
  name: string;
  gender: string;
  birth: string;
  picture: string;
}

interface ListPlayerResponse {
  data: Player[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

export async function addPlayer(data: CreatePlayerDto) {
  const response = await customAxios.post<DefaultReturn>('/players/create', data);
  return response.data;
}

export async function editPlayer(id: number, data: CreatePlayerDto) {
  const response = await customAxios.patch<DefaultReturn>(`/players/${id}`, data);
  return response.data;
}

export async function listPlayer(page: number) {
  const params = { page };
  const response = await customAxios.get<ListPlayerResponse>('/players/list', { params });
  return response.data;
}

export async function removePlayer(id: number) {
  const response = await customAxios.delete<ListPlayerResponse>(`/players/remove, ${id}`);
  return response.data;
}
