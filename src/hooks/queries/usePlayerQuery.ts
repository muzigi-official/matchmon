import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { getPlayer, listPlayer, addPlayer, editPlayer, removePlayer } from '@/api/player';
import { playerQueryKeys } from '@/queryKeys/playerQueryKeys';

export const usePlayerQuery = (id: number | string) => {
  return useQuery<IGetPlayerResponse[], AxiosError<IErrorResponse>>(playerQueryKeys.player(id), () => getPlayer(id), {
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const usePlayerListQuery = (page: number) => {
  return useQuery<IListPlayerResponse, AxiosError<IErrorResponse>>(
    playerQueryKeys.playerList(page),
    () => listPlayer(page),
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

export const useAddPlayerMutation = (setCurrentPage: (page: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data: ICreatePlayerDto) => addPlayer(data), {
    onSuccess: () => {
      // 최신 데이터를 가져온 후, 마지막 페이지 번호를 계산
      const lastPage =
        queryClient.getQueryData<IListPlayerResponse>(playerQueryKeys.playerList(1))?.meta.last_page || 1;

      // 마지막 페이지로 이동
      setCurrentPage(lastPage);
      toast.success('플레이어가 성공적으로 추가되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useEditPlayerMutation = (currentPage: number) => {
  const queryClient = useQueryClient();

  return useMutation(
    (playerData: IUpdatePlayerDto) => editPlayer(playerData.id, playerData), // `id`와 나머지 데이터를 전달
    {
      onSuccess: () => {
        // 플레이어 목록 쿼리 무효화
        queryClient.invalidateQueries(playerQueryKeys.playerList(currentPage)); // 페이지 번호는 필요에 따라 조정 가능
        toast.success('플레이어 정보가 성공적으로 수정되었습니다.');
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      },
    },
  );
};

export const useRemovePlayerMutation = (currentPage: number, setCurrentPage: (page: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => removePlayer(id), {
    onSuccess: () => {
      // 현재 페이지의 쿼리를 무효화하여 데이터를 새로 가져옴
      queryClient.invalidateQueries(playerQueryKeys.playerList(currentPage));

      // 현재 페이지에 남아 있는 플레이어 수를 확인
      const remainingPlayers =
        queryClient.getQueryData<IListPlayerResponse>(playerQueryKeys.playerList(currentPage))?.data.length || 0;

      // 현재 페이지에 플레이어가 없고, 이전 페이지가 존재하는 경우
      if (remainingPlayers === 0 && currentPage > 1) {
        // 마지막 페이지를 다시 설정
        const lastPage =
          queryClient.getQueryData<IListPlayerResponse>(playerQueryKeys.playerList(currentPage - 1))?.meta.last_page ||
          1;
        setCurrentPage(lastPage);
      }

      toast.success('플레이어가 성공적으로 삭제되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
