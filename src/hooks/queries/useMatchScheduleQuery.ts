import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import { fetchMatchResultsList } from '@/api/matchResult';
import {
  updateMatchSchedule,
  updateBulkMatchSchedules,
  deleteMatchSchedule,
  deleteMatchSchedulesByCompetitionId,
  createScheduleBulk,
} from '@/api/matchSchedule';
import { matchScheduleQueryKeys } from '@/queryKeys/matchSchedule';

// 일정 목록은 Match로 통합됨 → 경기+결과 목록에서 match 정보만 뽑아 기존 IMatchScheduleDto 형태로 변환.
export const useMatchSchedulesQuery = (competitionId: number) => {
  return useQuery<IMatchScheduleDto[], AxiosError<IErrorResponse>>(
    matchScheduleQueryKeys.schedules(competitionId),
    async () => {
      const results = await fetchMatchResultsList(competitionId);
      return results.map(r => ({
        id: r.match.id,
        homeTeamId: r.match.homeParticipantId,
        awayTeamId: r.match.awayParticipantId,
        homeTeamName: r.match.homeParticipantName,
        awayTeamName: r.match.awayParticipantName,
        matchTime: r.match.matchTime,
        stadium: r.match.stadium,
      }));
    },
    { enabled: !!competitionId },
  );
};

export const useUpdateMatchScheduleMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: IMatchScheduleDto) => updateMatchSchedule(competitionId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('경기 정보가 저장되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || '경기 정보 저장 중 오류가 발생했습니다.');
    },
  });
};

export const useDeleteMatchScheduleMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((matchId: number) => deleteMatchSchedule(competitionId, matchId), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('경기가 삭제되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || '경기 삭제 중 오류가 발생했습니다.');
    },
  });
};

// TODO(백엔드 협의 필요): 아래 bulk 계열은 백엔드 대응 엔드포인트가 없어 현재 동작하지 않음(404).
// 경기 생성은 건별 group-stage/tournament 엔드포인트로 대체해야 하며, bulk가 필요하면 백엔드에 요청할 것.
export const useCreateScheduleBulkMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((params: ICreateScheduleBulkDto[]) => createScheduleBulk(competitionId, params), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('일정이 생성되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || '일정 생성(bulk)은 현재 백엔드 미지원입니다.');
    },
  });
};

export const useUpdateBulkMatchSchedulesMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((data: IMatchScheduleDto[]) => updateBulkMatchSchedules(competitionId, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      console.error('bulk 수정은 현재 백엔드 미지원:', error.response?.data?.message || error.message);
    },
  });
};

export const useDeleteMatchSchedulesByCompetitionIdMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(() => deleteMatchSchedulesByCompetitionId(competitionId), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchScheduleQueryKeys.schedules(competitionId));
      toast.success('일정이 전체 삭제되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      toast.error(error.response?.data?.message || '전체 삭제는 현재 백엔드 미지원입니다.');
    },
  });
};
