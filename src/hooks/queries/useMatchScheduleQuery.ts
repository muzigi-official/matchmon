import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import {
  fetchMatchSchedules,
  createMatchSchedule,
  createMatchSchedules,
  updateMatchSchedule,
  deleteMatchSchedule,
} from '@/api/matchSchedule';
import { matchScheduleQueryKeys } from '@/queryKeys/matchSchedule';

export const useMatchSchedulesQuery = (competitionId: number) => {
  return useQuery<IMatchSchedule[], AxiosError<IErrorResponse>>(matchScheduleQueryKeys.schedules(competitionId), () =>
    fetchMatchSchedules(competitionId),
  );
};

export const useCreateMatchScheduleMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(createMatchSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('Match schedule created successfully!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message || 'Error creating match schedule');
      }
    },
  });
};

export const useCreateMatchSchedulesMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(createMatchSchedules, {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('Match schedules created successfully!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Error creating match schedules');
    },
  });
};

export const useUpdateMatchScheduleMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(updateMatchSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('Match schedule updated successfully!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Error updating match schedule');
    },
  });
};

export const useDeleteMatchScheduleMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(deleteMatchSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('Match schedule deleted successfully!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Error deleting match schedule');
    },
  });
};
