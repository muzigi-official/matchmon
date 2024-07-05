import customAxios from '@/api/customAxios';

interface IListCompetitionResponse {
  data: ICompetition[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

interface ICreateCompetitionDto {
  name: string;
  address: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
  organizer: string;
}

interface IApplyCompetitionDto {
  competitionId: number;
  teamId: number | string;
}

export async function listCompetition(page: number) {
  const params = { page };
  const response = await customAxios.get<IListCompetitionResponse>('/competitions/list', { params });
  return response.data;
}

export async function addCompetition(data: ICreateCompetitionDto) {
  const parseData = { ...data, poster: '', description: '' };
  const response = await customAxios.post<TDefaultReturn>('/competitions/create', parseData);
  return response;
}

export async function getCompetition(competitionId: number | string) {
  const response = await customAxios.get<ICompetition>(`/competitions/get/${competitionId}`);
  return response.data;
}

export async function applyCompetition(data: IApplyCompetitionDto) {
  const response = await customAxios.post<TDefaultReturn>('/competitions/apply', data);
  return response.data;
}
