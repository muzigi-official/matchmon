import customAxios from '@/api/customAxios';

interface IListJoinTeamCompResponse {
  id: number;
  competition: ICompetition;
  team: ITeam;
  participateState: string;
}

interface IToggleJoinTeamDto {
  joinTeamCompId: number;
  playerId: number;
}

export async function addJoinTeam(data: IToggleJoinTeamDto) {
  const response = await customAxios.patch<TDefaultReturn>('/joinTeamComp/addPlayers', data);
  return response.data;
}

export async function getParticipateTeams(competitionId: number | string) {
  const params = { competitionId };
  const response = await customAxios.get<IListJoinTeamCompResponse[]>(`/joinTeamComp/list`, { params });
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

export async function removeJoinTeam(data: IToggleJoinTeamDto) {
  const response = await customAxios.patch<TDefaultReturn>('/joinTeamComp/removePlayer', data);
  return response.data;
}
