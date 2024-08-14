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
      // 최신 데이터를 가져온 후, 마지막 페이지 번호를 계산
      const lastPage = queryClient.getQueryData<IListTeamResponse>(teamQueryKeys.teamList(1))?.meta.last_page || 1;

      // 마지막 페이지로 이동
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

  return useMutation(
    (teamData: IUpdateTeamDto) => editTeam(teamData), // `id`와 나머지 데이터를 전달
    {
      onSuccess: () => {
        // 팀 목록 쿼리 무효화
        queryClient.invalidateQueries(teamQueryKeys.teamList(currentPage)); // 페이지 번호는 필요에 따라 조정 가능
        toast.success('팀 정보가 성공적으로 수정되었습니다.');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      },
    },
  );
};

export const useRemoveTeamMutation = (currentPage: number, setCurrentPage: (page: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => removeTeam(id), {
    onSuccess: () => {
      // 현재 페이지의 쿼리를 무효화하여 데이터를 새로 가져옴
      queryClient.invalidateQueries(teamQueryKeys.teamList(currentPage));

      // 현재 페이지에 남아 있는 팀 수를 확인
      const remainingTeams =
        queryClient.getQueryData<IListTeamResponse>(teamQueryKeys.teamList(currentPage))?.data.length || 0;

      // 현재 페이지에 팀이 없고, 이전 페이지가 존재하는 경우
      if (remainingTeams === 0 && currentPage > 1) {
        // 마지막 페이지를 다시 설정
        const lastPage =
          queryClient.getQueryData<IListTeamResponse>(teamQueryKeys.teamList(currentPage - 1))?.meta.last_page || 1;
        setCurrentPage(lastPage);
      }

      toast.success('팀이 성공적으로 삭제되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
