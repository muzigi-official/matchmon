import customAxios from '@/api/remove_customAxios';

type TDefaultReturn = string;

interface ICreateTournamentDto {
  competitionId: string;
  numberOfTeam: string;
}
interface IGetTournamentListResponse extends ICompetition {
  tournaments: ITournamentNode[];
}

export async function getTournamentList(competitionId: number | string) {
  const params = { competitionId };
  const response = await customAxios.get<IGetTournamentListResponse>('/tournaments/list', { params });
  return response.data;
}
