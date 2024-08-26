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
      keepPreviousData: true,
    },
  );
};

export const useAddPlayerMutation = (setCurrentPage: (page: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation((data: ICreatePlayerDto) => addPlayer(data), {
    onSuccess: () => {
      const lastPage =
        queryClient.getQueryData<IListPlayerResponse>(playerQueryKeys.playerList(1))?.meta.last_page || 1;

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

  return useMutation((playerData: IUpdatePlayerDto) => editPlayer(playerData.id, playerData), {
    onSuccess: () => {
      queryClient.invalidateQueries(playerQueryKeys.playerList(currentPage));
      toast.success('플레이어 정보가 성공적으로 수정되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useRemovePlayerMutation = (currentPage: number, setCurrentPage: (page: number) => void) => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => removePlayer(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(playerQueryKeys.playerList(currentPage));

      const remainingPlayers =
        queryClient.getQueryData<IListPlayerResponse>(playerQueryKeys.playerList(currentPage))?.data.length || 0;

      if (remainingPlayers === 0 && currentPage > 1) {
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
