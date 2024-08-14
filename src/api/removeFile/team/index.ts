import customAxios from '@/api/remove_customAxios';

interface IUpdateTeamDto {
  name: string;
  location: string;
  emblem: string;
  gender: string;
  teamId: number;
}

interface IListTeamResponse {
  data: ITeam[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

export async function addTeam(data: ITeamFormInput) {
  const response = await customAxios.post<TDefaultReturn>('/teams/create', data);
  return response;
}

export async function editTeam(data: IUpdateTeamDto) {
  const response = await customAxios.patch<TDefaultReturn>(`/teams/update${data.teamId}`, data);
  return response.data;
}
export async function getTeam(id: number | string) {
  const response = await customAxios.get<ITeam>(`/teams/get/${id}`);
  return response.data;
}

export async function listTeam(page: number, itemPerPage: number) {
  const params = { page, itemPerPage };
  const response = await customAxios.get<IListTeamResponse>('/teams/list', { params });
  return response.data;
}

export async function removeTeam(id: number) {
  const response = await customAxios.delete<IListTeamResponse>(`/teams/remove, ${id}`);
  return response.data;
}
