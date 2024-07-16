import requestAPI from '@/utils/api';

export const requestGroupStagesWithTeams = (competitionId: number): Promise<IGroupStage[]> =>
  requestAPI.get(`/group-stages/competition/${competitionId}`);

export const createGroupstage = (competitionId: number, groupName: string): Promise<TDefaultReturn> =>
  requestAPI.post('/group-stages', { name: groupName, competitionId });

export const deleteGroupstage = (groupId: number): Promise<void> => requestAPI.delete(`/group-stages/${groupId}`);

export const addTeamToGroup = (groupId: number, teamId: number, competitionId: number): Promise<TDefaultReturn> =>
  requestAPI.post('/group-stages/add-team', { groupStageId: groupId, teamId, competitionId });

export const removeTeamFromGroup = (groupId: number, teamId: number): Promise<TDefaultReturn> =>
  requestAPI.delete(`/group-stages/${groupId}/remove-team/${teamId}`);
