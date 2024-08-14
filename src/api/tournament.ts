import requestAPI from '@/utils/api';

interface ICreateTournamentDto {
  competitionId: string;
  numberOfTeam: string;
}
interface IGetTournamentListResponse extends ICompetition {
  tournaments: ITournamentNode[];
}

const API_URL = '/tournaments';

export const tournamentList = (competitionId: number | string): Promise<IGetTournamentListResponse> => {
  return requestAPI.get(`${API_URL}/list`, { params: { competitionId } });
};

export const createTournament = (data: ICreateTournamentDto): Promise<TDefaultReturn> =>
  requestAPI.post(`${API_URL}/create`, data);
