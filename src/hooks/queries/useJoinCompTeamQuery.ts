import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';

import {
  fetchParticipateTeams,
  fetchParticipatePlayers,
  fetchParticipateTeamInPlayers,
  addJoinCompTeam,
  deleteJoinCompTeam,
} from '@/api/joinTeamComps';
import { joinTeamCompsQueryKeys } from '@/queryKeys/joinTeamCompsQueryKeys';

export const useParticipateTeamsQuery = (competitionId: number | string) => {
  return useQuery<IListJoinTeamCompResponse[], AxiosError>(joinTeamCompsQueryKeys.participateTeams(competitionId), () =>
    fetchParticipateTeams(competitionId),
  );
};

export const useParticipatePlayersQuery = (joinTeamCompId: number | string) => {
  return useQuery<IPlayer[], AxiosError>(joinTeamCompsQueryKeys.participatePlayers(joinTeamCompId), () =>
    fetchParticipatePlayers(joinTeamCompId),
  );
};

export const useParticipateTeamInPlayersQuery = (joinTeamCompId: number | string) => {
  return useQuery<ICompetitionTeam, AxiosError>(
    joinTeamCompsQueryKeys.participateTeamInPlayers(Number(joinTeamCompId)),
    () => fetchParticipateTeamInPlayers(Number(joinTeamCompId)),
  );
};

export const useAddJoinCompTeamMutation = (joinCompId: string) => {
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamCompDto) => addJoinCompTeam(data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(joinTeamCompsQueryKeys.participatePlayers(joinCompId));
      toast.success('선수 참가 신청이 성공했습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useDeleteJoinCompTeamMutation = (joinCompId: string) => {
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamCompDto) => deleteJoinCompTeam(data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(joinTeamCompsQueryKeys.participatePlayers(joinCompId));
      toast.success('선수 참가 신청 취소가 완료됐습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
