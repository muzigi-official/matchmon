import toast from 'react-hot-toast';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import { AxiosError } from 'axios';

import {
  fetchParticipateTeams,
  fetchParticipatePlayers,
  fetchParticipateTeamInPlayers,
  addJoinCompTeam,
  deleteJoinCompTeam,
} from '@/api/joinTeamComps';
import { joinTeamCompsQueryKeys } from '@/queryKeys/joinTeamCompsQueryKeys';

export const useParticipateTeamsQuery = (competitionId: number | string) => {
  return useQuery<IListJoinTeamCompResponse[], AxiosError>(
    joinTeamCompsQueryKeys.participateTeams(competitionId),
    () => fetchParticipateTeams(competitionId),
    { enabled: !!competitionId },
  );
};

export const useParticipatePlayersQuery = (competitionId: number | string, participantId: number | string) => {
  return useQuery<IPlayer[], AxiosError>(
    joinTeamCompsQueryKeys.participatePlayers(participantId),
    () => fetchParticipatePlayers(competitionId, participantId),
    { enabled: !!competitionId && !!participantId },
  );
};

export const useParticipateTeamInPlayersQuery = (competitionId: number | string, participantId: number | string) => {
  return useQuery<ICompetitionTeam, AxiosError>(
    joinTeamCompsQueryKeys.participateTeamInPlayers(Number(participantId)),
    () => fetchParticipateTeamInPlayers(competitionId, Number(participantId)),
    { enabled: !!competitionId && !!participantId },
  );
};

export const useAddJoinCompTeamMutation = (competitionId: number | string, participantId: string) => {
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamCompDto) => addJoinCompTeam(competitionId, data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(joinTeamCompsQueryKeys.participatePlayers(participantId));
      toast.success('선수 참가 신청이 성공했습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};

export const useDeleteJoinCompTeamMutation = (competitionId: number | string, participantId: string) => {
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamCompDto) => deleteJoinCompTeam(competitionId, data), {
    onSuccess: async () => {
      await queryClient.invalidateQueries(joinTeamCompsQueryKeys.participatePlayers(participantId));
      toast.success('선수 참가 신청 취소가 완료됐습니다.');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
      }
    },
  });
};
