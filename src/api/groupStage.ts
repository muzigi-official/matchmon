import requestAPI from '@/utils/api';

// 조(group-stage)는 competitions/:competitionId/group-stages 하위로 이동 (2026-10-16 백엔드 라우트 정리)
// 응답: [{ id, name, participants: [{ id, teamId, name, emblem }] }]
export const requestGroupStagesWithTeams = (competitionId: number): Promise<IGroupStage[]> =>
  requestAPI.get(`/competitions/${competitionId}/group-stages`);

// TODO(백엔드 경로 확인 필요): 아래 조 생성/삭제/팀배정은 레거시 /group-stages/* 경로라 404일 수 있음.
// 조짜기 기능 작업 시 competitions/:id/group-stages 하위 경로로 백엔드와 맞춰야 함.
export const createGroupstage = (competitionId: number, groupName: string): Promise<IGroupStage> =>
  requestAPI.post(`/competitions/${competitionId}/group-stages`, { name: groupName, competitionId });

export const deleteGroupstage = (competitionId: number, groupId: number): Promise<void> =>
  requestAPI.delete(`/competitions/${competitionId}/group-stages/${groupId}`);

export const addTeamToGroup = (groupId: number, teamId: number, competitionId: number): Promise<TDefaultReturn> =>
  requestAPI.post(`/competitions/${competitionId}/group-stages/add-team`, { groupStageId: groupId, teamId });

export const removeTeamFromGroup = (
  competitionId: number,
  groupId: number,
  teamId: number,
): Promise<TDefaultReturn> =>
  requestAPI.delete(`/competitions/${competitionId}/group-stages/${groupId}/remove-team/${teamId}`);
