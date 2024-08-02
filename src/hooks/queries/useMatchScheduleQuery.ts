import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import {
  fetchMatchSchedules,
  createMatchSchedule,
  createMatchSchedules,
  updateMatchSchedule,
  updateBulkMatchSchedules,
  deleteMatchSchedule,
  deleteMatchSchedulesByCompetitionId,
  createScheduleBulk,
} from '@/api/matchSchedule';
import { matchScheduleQueryKeys } from '@/queryKeys/matchSchedule';

export const useMatchSchedulesQuery = (competitionId: number) => {
  return useQuery<IMatchScheduleDto[], AxiosError<IErrorResponse>>(
    matchScheduleQueryKeys.schedules(competitionId),
    () => fetchMatchSchedules(competitionId),
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

export const useCreateBulkMatchSchedulesMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation<IMatchSchedule[], AxiosError<IErrorResponse>, IMatchScheduleDto[]>(
    data => createMatchSchedules(data.map(d => ({ ...d, competitionId }))), // competitionId 추가
    {
      onSuccess: () => {
        queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
        toast.success('Match schedules created successfully!');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        toast.error(error.response?.data?.message || 'Error creating match schedules');
      },
    },
  );
};

export const useCreateScheduleBulkMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((params: ICreateScheduleBulkDto[]) => createScheduleBulk(competitionId, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('Schedules created successfully!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Error creating schedules');
    },
  });
};

export const useUpdateMatchScheduleMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(updateMatchSchedule, {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('전체 시간표가 성공적으로 저장되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.log(error.response);
      toast.error(error.response?.data?.message || '전체 시간표 저장 중 오류가 발생했습니다.');
    },
  });
};

export const useUpdateBulkMatchSchedulesMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(updateBulkMatchSchedules, {
    onSuccess: () => {
      queryClient.invalidateQueries(['matchSchedules', competitionId]);
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error('Error updating match schedules:', error.response?.data?.message || error.message);
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

export const useDeleteMatchSchedulesByCompetitionIdMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteMatchSchedulesByCompetitionId(competitionId), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('All match schedules for the competition deleted successfully!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || 'Error deleting match schedules for the competition');
    },
  });
};
