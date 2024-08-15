import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import { getCompetition, listCompetition, addCompetition, applyCompetition } from '@/api/competition';
import { competitionQueryKeys } from '@/queryKeys/competitionQueryKey';

export const useCompetitionQuery = (competitionId: number | string) => {
  return useQuery<ICompetition[], AxiosError>(competitionQueryKeys.competition(competitionId), () =>
    getCompetition(competitionId),
  );
};

export const useCompetitionListQuery = (page: number) => {
  return useQuery<IListCompetitionResponse, AxiosError>(
    competitionQueryKeys.competitionList(page),
    () => listCompetition(page),
    {
      keepPreviousData: true, // 페이지 전환 시 이전 데이터를 유지하여 부드러운 전환
    },
  );
};

export const useAddCompetitionMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: ICompetitionFormInput) => addCompetition(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(competitionQueryKeys.competitionList(1)); // 성공 시 첫 페이지를 다시 불러옵니다.
    },
  });
};

export const useApplyCompetitionMutation = () => {
  return useMutation((data: IApplyCompetitionDto) => applyCompetition(data));
};
