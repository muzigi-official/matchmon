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
  return useQuery<IPlayer[], AxiosError>(joinTeamCompsQueryKeys.participateTeamInPlayers(joinTeamCompId), () =>
    fetchParticipateTeamInPlayers(joinTeamCompId),
  );
};

export const useAddJoinCompTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamDto) => addJoinCompTeam(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(joinTeamCompsQueryKeys.participateTeams(variables.joinTeamCompId));
    },
  });
};

export const useDeleteJoinCompTeamMutation = () => {
  const queryClient = useQueryClient();
  return useMutation((data: IToggleJoinTeamDto) => deleteJoinCompTeam(data), {
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries(joinTeamCompsQueryKeys.participateTeams(variables.joinTeamCompId));
    },
  });
};
