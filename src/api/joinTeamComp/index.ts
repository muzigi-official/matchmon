import customAxios from '@/api/customAxios';

type DefaultReturn = string;

interface ListJoinTeamCompResponse {
  id: number;
  competition: ICompetition;
  team: ITeam;
  participateState: string;
}

interface ToggleJoinTeamDto {
  joinTeamCompId: number;
  playerId: number;
}

export async function addJoinTeam(data: ToggleJoinTeamDto) {
  const response = await customAxios.patch<DefaultReturn>('/joinTeamComp/addPlayers', data);
  return response.data;
}

export async function getParticipateTeams(competitionId: number | string) {
  const params = { competitionId };
  const response = await customAxios.get<ListJoinTeamCompResponse[]>(`/joinTeamComp/list`, { params });
  return response.data;
}

export async function getParticipatPlayers(joinTeamCompId: number | string) {
  const params = { joinTeamCompId };
  const response = await customAxios.get<IPlayer[]>(`/joinTeamComp/players`, { params });
  return response.data;
}

export async function getParticipateTeamInPlayers(joinTeamCompId: number | string) {
  const params = { joinTeamCompId };
  const response = await customAxios.get<ITeam>(`/joinTeamComp/relatedTeam`, { params });
  return response.data;
}

export async function removeJoinTeam(data: ToggleJoinTeamDto) {
  const response = await customAxios.patch<DefaultReturn>('/joinTeamComp/removePlayer', data);
  return response.data;
}
