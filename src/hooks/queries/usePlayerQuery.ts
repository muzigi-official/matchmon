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

export const useAddPlayerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: ICreatePlayerDto) => addPlayer(data), {
    onSuccess: () => {
      queryClient.invalidateQueries(playerQueryKeys.playerList(1)); // 첫 페이지를 다시 가져오도록 설정
      toast.success('플레이어가 성공적으로 추가되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useEditPlayerMutation = () => {
  const queryClient = useQueryClient();

  return useMutation(
    (playerData: IUpdatePlayerDto) => editPlayer(playerData.id, playerData), // `id`와 나머지 데이터를 전달
    {
      onSuccess: () => {
        // 플레이어 목록 쿼리 무효화
        queryClient.invalidateQueries(playerQueryKeys.playerList(1)); // 페이지 번호는 필요에 따라 조정 가능
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

export const useRemovePlayerMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((id: number) => removePlayer(id), {
    onSuccess: () => {
      queryClient.invalidateQueries(playerQueryKeys.playerList(1)); // 삭제 후 첫 페이지를 다시 가져오도록 설정
      toast.success('플레이어가 성공적으로 삭제되었습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
