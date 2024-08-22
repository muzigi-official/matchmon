import requestAPI from '@/utils/api';

export const fetchParticipateTeams = (competitionId: number | string): Promise<IListJoinTeamCompResponse[]> => {
  const params = { competitionId };
  return requestAPI.get(`/joinTeamComp/list`, { params });
};

export const fetchParticipatePlayers = (joinTeamCompId: number | string): Promise<IPlayer[]> => {
  const params = { joinTeamCompId };
  return requestAPI.get(`/joinTeamComp/players`, { params });
};

export const fetchParticipateTeamInPlayers = (joinTeamCompId: number | string): Promise<ICompetitionTeam> => {
  const params = { joinTeamCompId };
  return requestAPI.get(`/joinTeamComp/relatedTeam`, { params });
};

export const addJoinCompTeam = (data: IToggleJoinTeamCompDto): Promise<TDefaultReturn> =>
  requestAPI.patch(`/joinTeamComp/addPlayers`, data);

export const deleteJoinCompTeam = (data: IToggleJoinTeamCompDto): Promise<TDefaultReturn> =>
  requestAPI.patch(`/joinTeamComp/removePlayer`, data);
