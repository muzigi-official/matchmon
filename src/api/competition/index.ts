import customAxios from '@/api/customAxios';

interface ListCompetitionResponse {
  data: Competition[];
  meta: {
    total: number;
    page: number;
    last_page: number;
  };
}

export async function listCompetition(page: number) {
  const params = { page };
  const response = await customAxios.get<ListCompetitionResponse>('/competitions/list', { params });
  return response.data;
}
