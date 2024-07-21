import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { fetchMatchSettings, createMatchSetting, updateMatchSetting, deleteMatchSetting } from '@/api/matchSetting';
import { matchSettingQueryKeys } from '@/queryKeys/matchSetting';

export const useMatchSettingsQuery = (competitionId: number) => {
  return useQuery<IMatchSetting[], AxiosError<IErrorResponse>>(matchSettingQueryKeys.matchSettings(competitionId), () =>
    fetchMatchSettings(competitionId),
  );
};

export const useCreateMatchSettingMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((params: ICreateMatchSettingParams) => createMatchSetting(params), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(matchSettingQueryKeys.matchSettings(variables.competitionId));
      toast.success('경기 설정이 성공적으로 생성되었습니다!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useUpdateMatchSettingMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((params: ICreateMatchSettingParams & { id: number }) => updateMatchSetting(params), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchSettingQueryKeys.matchSettings(competitionId));
      toast.success('경기 설정이 성공적으로 업데이트되었습니다!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useDeleteMatchSettingMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => deleteMatchSetting(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(matchSettingQueryKeys.matchSettings(competitionId));
      toast.success('경기 설정이 성공적으로 삭제되었습니다!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
