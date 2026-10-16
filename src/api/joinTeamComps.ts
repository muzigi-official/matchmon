import requestAPI from '@/utils/api';

// 참가팀/참가자는 competitions/:competitionId/participants 하위로 이동 (2026-10-16 백엔드 라우트 정리)
// 쿼리/바디 파라미터명: joinTeamCompId → participantId

export const fetchParticipateTeams = (competitionId: number | string): Promise<IListJoinTeamCompResponse[]> => {
  const params = { competitionId };
  return requestAPI.get(`/competitions/${competitionId}/participants/list`, { params });
};

export const fetchParticipatePlayers = (
  competitionId: number | string,
  participantId: number | string,
): Promise<IPlayer[]> => {
  const params = { participantId };
  return requestAPI.get(`/competitions/${competitionId}/participants/players`, { params });
};

export const fetchParticipateTeamInPlayers = (
  competitionId: number | string,
  participantId: number | string,
): Promise<ICompetitionTeam> => {
  const params = { participantId };
  return requestAPI.get(`/competitions/${competitionId}/participants/relatedTeam`, { params });
};

export const addJoinCompTeam = (
  competitionId: number | string,
  data: IToggleJoinTeamCompDto,
): Promise<TDefaultReturn> => requestAPI.patch(`/competitions/${competitionId}/participants/addPlayers`, data);

export const deleteJoinCompTeam = (
  competitionId: number | string,
  data: IToggleJoinTeamCompDto,
): Promise<TDefaultReturn> => requestAPI.patch(`/competitions/${competitionId}/participants/removePlayer`, data);
