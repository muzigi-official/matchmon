import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { getTeam, listTeam, addTeam, editTeam, removeTeam } from '@/api/team';
import { teamQueryKeys } from '@/queryKeys/teamQueryKeys';

export const useTeamQuery = (id: number | string) => {
  return useQuery<ITeam[], AxiosError<IErrorResponse>>(teamQueryKeys.team(id), () => getTeam(id), {
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useTeamListQuery = (page: number, itemPerPage: number = 10) => {
  return useQuery<IListTeamResponse, AxiosError<IErrorResponse>>(
    teamQueryKeys.teamList(page, itemPerPage),
    () => listTeam(page, itemPerPage), // 페이지 당 항목 수를 10으로 가정
    {
      onError: (error: AxiosError<IErrorResponse>) => {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      },
      keepPreviousData: true, // 페이지 변경 시 이전 데이터를 유지하여 부드러운 전환
    },
  );
};

export const useAddTeamMutation = (setCurrentPage: (page: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data: ITeamFormInput) => addTeam(data), {
    onSuccess: () => {
      const lastPage = queryClient.getQueryData<IListTeamResponse>(teamQueryKeys.teamList(1))?.meta.last_page || 1;

      setCurrentPage(lastPage);
      toast.success('팀이 성공적으로 추가되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useEditTeamMutation = (currentPage: number) => {
  const queryClient = useQueryClient();

  return useMutation((teamData: IUpdateTeamDto) => editTeam(teamData), {
    onSuccess: () => {
      queryClient.invalidateQueries(teamQueryKeys.teamList(currentPage));
      toast.success('팀 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useRemoveTeamMutation = (currentPage: number, setCurrentPage: (page: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => removeTeam(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(teamQueryKeys.teamList(currentPage));

      const remainingTeams =
        queryClient.getQueryData<IListTeamResponse>(teamQueryKeys.teamList(currentPage))?.data.length || 0;

      if (remainingTeams === 0 && currentPage > 1) {
        const lastPage =
          queryClient.getQueryData<IListTeamResponse>(teamQueryKeys.teamList(currentPage - 1))?.meta.last_page || 1;
        setCurrentPage(lastPage);
      }

      toast.success('팀이 성공적으로 삭제되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.status === 400) {
        toast.error(error.response?.data?.message || '팀을 삭제할 수 없습니다.');
      } else {
        toast.error('오류가 발생했습니다. 다시 시도해 주세요.');
      }
    },
  });
};
