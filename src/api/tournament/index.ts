import customAxios from '@/api/customAxios';

type TDefaultReturn = string;

interface ICreateTournamentDto {
  competitionId: string;
  numberOfTeam: string;
}
interface IGetTournamentListResponse extends ICompetition {
  tournaments: ITournamentNode[];
}

export async function createTournament(data: ICreateTournamentDto) {
  const response = await customAxios.post<TDefaultReturn>('/tournaments/create', data);
  return response.data;
}

export async function getTournamentList(competitionId: number | string) {
  const params = { competitionId };
  const response = await customAxios.get<IGetTournamentListResponse>('/tournaments/list', { params });
  return response.data;
}
