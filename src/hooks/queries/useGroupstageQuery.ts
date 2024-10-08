import { useQuery, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import {
  requestGroupStagesWithTeams,
  createGroupstage,
  deleteGroupstage,
  addTeamToGroup,
  removeTeamFromGroup,
} from '@/api/groupStage';
import { groupstageQueryKeys } from '@/queryKeys/groupstage';
import { joinTeamCompsQueryKeys } from '@/queryKeys/joinTeamCompsQueryKeys';

export const useGroupstageWithTeamsQuery = (competitionId: number) => {
  return useQuery<IGroupStage[], AxiosError<IErrorResponse>>(groupstageQueryKeys.groupStage(competitionId), () =>
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
      onError: (error: AxiosError<IErrorResponse>) => {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
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
      toast.success('조 삭제 성공!!!!');
    },
    onError: (error: AxiosError<IErrorResponse>) => {
      if (error.response?.data?.message) {
        toast.error(error.response?.data?.message);
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
      onError: (error: AxiosError<IErrorResponse>) => {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
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
        queryClient.invalidateQueries(joinTeamCompsQueryKeys.participateTeams(competitionId));
      },
      onError: (error: AxiosError<IErrorResponse>) => {
        if (error.response?.data?.message) {
          toast.error(error.response?.data?.message);
        }
      },
    },
  );
};
