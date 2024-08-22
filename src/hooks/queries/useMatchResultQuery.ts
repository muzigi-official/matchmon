import { useQuery, useMutation, useQueryClient } from 'react-query';
import { fetchMatchResult, fetchMatchResultsList, createMatchResult, updateMatchResult } from '@/api/matchResult';
import { matchResultQueryKeys } from '@/queryKeys/matchResult'; // 쿼리 키 파일을 불러옵니다.

export const useMatchResult = (scheduleId: number) => {
  return useQuery<IMatchResultDto>(matchResultQueryKeys.result(scheduleId), () => fetchMatchResult(scheduleId));
};

export const useMatchResultsList = (competitionId: number) => {
  return useQuery<IMatchResultDto[]>(matchResultQueryKeys.list(competitionId), () =>
    fetchMatchResultsList(competitionId),
  );
};

export const useCreateMatchResult = () => {
  const queryClient = useQueryClient();
  return useMutation(createMatchResult, {
    onSuccess: data => {
      queryClient.invalidateQueries(matchResultQueryKeys.result(data.matchScheduleId));
    },
  });
};

export const useUpdateMatchResult = (scheduleId: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: IMatchResultDto) => updateMatchResult(scheduleId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchResultQueryKeys.result(scheduleId));
    },
  });
};
