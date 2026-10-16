import { useQuery, useMutation, useQueryClient } from 'react-query';

import {
  fetchMatchResult,
  fetchMatchResultsList,
  createMatchResult,
  updateMatchResult,
  createGoal,
  deleteGoal,
} from '@/api/matchResult';
import { matchResultQueryKeys } from '@/queryKeys/matchResult';

export const useMatchResult = (competitionId: number, matchId: number) => {
  return useQuery<IMatchResultDto>(
    matchResultQueryKeys.result(competitionId, matchId),
    () => fetchMatchResult(competitionId, matchId),
    { enabled: !!competitionId && !!matchId },
  );
};

export const useMatchResultsList = (competitionId: number) => {
  return useQuery<IMatchResultDto[]>(
    matchResultQueryKeys.list(competitionId),
    () => fetchMatchResultsList(competitionId),
    { enabled: !!competitionId },
  );
};

export const useCreateMatchResult = (competitionId: number, matchId: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: ICreateMatchResultDto) => createMatchResult(competitionId, matchId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchResultQueryKeys.result(competitionId, matchId));
      queryClient.invalidateQueries(matchResultQueryKeys.list(competitionId));
    },
  });
};

export const useUpdateMatchResult = (competitionId: number, matchId: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: ICreateMatchResultDto) => updateMatchResult(competitionId, matchId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchResultQueryKeys.result(competitionId, matchId));
      queryClient.invalidateQueries(matchResultQueryKeys.list(competitionId));
    },
  });
};

export const useCreateGoalMutation = (competitionId: number, matchId: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: ICreateGoalDto) => createGoal(competitionId, matchId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchResultQueryKeys.result(competitionId, matchId));
    },
  });
};

export const useDeleteGoalMutation = (competitionId: number, matchId: number) => {
  const queryClient = useQueryClient();
  return useMutation((goalId: number) => deleteGoal(competitionId, matchId, goalId), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchResultQueryKeys.result(competitionId, matchId));
    },
  });
};
