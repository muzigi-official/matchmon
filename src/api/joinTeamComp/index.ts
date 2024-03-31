import customAxios from '@/api/customAxios';

type DefaultReturn = string;

interface ListJoinTeamCompResponse {
  id: number;
  competition: Competition;
  team: Team;
  participateState: string;
}

interface AddJoinTeamDto {
  joinTeamCompId: number;
  playerId: number;
}

export async function addJoinTeam(data: AddJoinTeamDto) {
  const response = await customAxios.patch<DefaultReturn>('/joinTeamComp/addPlayers', data);
  return response.data;
}

export async function getParticipateTeams(competitionId: number | string) {
  const params = { competitionId };
  const response = await customAxios.get<ListJoinTeamCompResponse[]>(`/joinTeamComp/list`, { params });
  return response.data;
}
