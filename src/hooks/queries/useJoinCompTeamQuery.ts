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
  console.log('TeamInPlayers', joinTeamCompsQueryKeys.participateTeamInPlayers(Number(joinTeamCompId)));
  return useQuery<ICompetitionTeam, AxiosError>(
    joinTeamCompsQueryKeys.participateTeamInPlayers(Number(joinTeamCompId)),
    () => fetchParticipateTeamInPlayers(Number(joinTeamCompId)),
    {
      refetchOnWindowFocus: false,
      refetchOnMount: true,
    },
  );
};

export const useAddJoinCompTeamMutation = () => {
  console.log('usequery add');
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamDto) => addJoinCompTeam(data), {
    onSuccess: async (_, variables) => {
      // 선수 목록 쿼리를 무효화하여 다시 불러오게 함
      console.log('Add', joinTeamCompsQueryKeys.participatePlayers(variables.joinTeamCompId));

      // 팀 정보 및 선수 목록 쿼리 무효화
      await queryClient.refetchQueries(joinTeamCompsQueryKeys.participatePlayers(variables.joinTeamCompId));
    },
  });
};

export const useDeleteJoinCompTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamDto) => deleteJoinCompTeam(data), {
    onSuccess: async (_, variables) => {
      await queryClient.refetchQueries(joinTeamCompsQueryKeys.participatePlayers(variables.joinTeamCompId));
    },
  });
};
