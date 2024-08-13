import customAxios from '@/api/customAxios';

interface IApplyCompetitionDto {
  competitionId: number;
  teamId: number | string;
}

export async function getCompetition(competitionId: number | string) {
  const response = await customAxios.get<ICompetition>(`/competitions/get/${competitionId}`);
  return response.data;
}

export async function applyCompetition(data: IApplyCompetitionDto) {
  const response = await customAxios.post<TDefaultReturn>('/competitions/apply', data);
  return response.data;
}
