import customAxios from '@/api/customAxios';

type DefaultReturn = string;

interface CreateTeamDto {
  name: string;
  location: string;
  emblem: string;
  gender: string;
}

interface UpdateTeamDto {
  name: string;
  location: string;
  emblem: string;
  gender: string;
  teamId: number;
}

interface ListTeamResponse {
  data: ITeam[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

export async function addTeam(data: CreateTeamDto) {
  const response = await customAxios.post<DefaultReturn>('/teams/create', data);
  return response;
}

export async function editTeam(data: UpdateTeamDto) {
  const response = await customAxios.patch<DefaultReturn>(`/teams/update${data.teamId}`, data);
  return response.data;
}
export async function getTeam(id: number | string) {
  const response = await customAxios.get<ITeam>(`/teams/get/${id}`);
  return response.data;
}

export async function listTeam(page: number, itemPerPage: number) {
  const params = { page, itemPerPage };
  const response = await customAxios.get<ListTeamResponse>('/teams/list', { params });
  return response.data;
}

export async function removeTeam(id: number) {
  const response = await customAxios.delete<ListTeamResponse>(`/teams/remove, ${id}`);
  return response.data;
}
