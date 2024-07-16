import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import {
  requestGroupStagesWithTeams,
  createGroupstage,
  deleteGroupstage,
  addTeamToGroup,
  removeTeamFromGroup,
} from '@/api/groupStage';
import { groupstageQueryKeys } from '@/queryKeys/groupStage';

export const useGroupstageWithTeamsQuery = (competitionId: number) => {
  return useQuery<IGroupStage[], AxiosError<ErrorResponse>>(groupstageQueryKeys.groupStage(competitionId), () =>
    requestGroupStagesWithTeams(competitionId),
  );
};

export const useCreateGroupstageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { competitionId: number; groupName: string }) => createGroupstage(params.competitionId, params.groupName),
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries(groupstageQueryKeys.groupStage(variables.competitionId));
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        }
      },
    },
  );
};

export const useDeleteGroupstageMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation((groupId: number) => deleteGroupstage(groupId), {
    onSuccess: () => {
      queryClient.invalidateQueries(groupstageQueryKeys.groupStage(competitionId));
    },
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data?.message) {
        alert(error.response.data.message);
      }
    },
  });
};

export const useAddTeamToGroupMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    ({ groupId, teamId }: { groupId: number; teamId: number }) => addTeamToGroup(groupId, teamId, competitionId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(groupstageQueryKeys.groupStage(competitionId));
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        console.log(error);
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        }
      },
    },
  );
};

export const useRemoveTeamFromGroupMutation = (competitionId: number) => {
  const queryClient = useQueryClient();
  return useMutation(
    (params: { groupId: number; teamId: number }) => removeTeamFromGroup(params.groupId, params.teamId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(groupstageQueryKeys.groupStage(competitionId));
      },
      onError: (error: AxiosError<ErrorResponse>) => {
        if (error.response?.data?.message) {
          alert(error.response.data.message);
        }
      },
    },
  );
};
