import customAxios from '@/api/customAxios';

type DefaultReturn = string;

interface GetCompetitionResponse {
  competition: Competition;
}

interface ListCompetitionResponse {
  data: Competition[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

interface CreateCompetitionDto {
  name: string;
  address: string;
  phoneNumber: string;
  startDate: Date;
  endDate: Date;
  organizer: string;
}

export async function listCompetition(page: number) {
  const params = { page };
  const response = await customAxios.get<ListCompetitionResponse>('/competitions/list', { params });
  return response.data;
}

export async function addCompetition(data: CreateCompetitionDto) {
  const parseData = { ...data, poster: '', description: '' };
  const response = await customAxios.post<DefaultReturn>('/competitions/create', parseData);
  return response.data;
}

export async function getCompetition(competitionId: number | string) {
  const params = { competitionId };
  const response = await customAxios.get<GetCompetitionResponse>('/competitions/get/', { params });
  console.log(response);
  return response.data;
}
