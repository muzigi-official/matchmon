import requestAPI from '@/utils/api';

export const fetchMatchSettings = (competitionId: number): Promise<IMatchSetting[]> =>
  requestAPI.get(`/match-settings?competitionId=${competitionId}`);

export const createMatchSetting = (params: ICreateMatchSettingParams): Promise<IMatchSetting> =>
  requestAPI.post(`/match-settings`, params);

export const updateMatchSetting = (params: IUpdateMatchSettingParams): Promise<IMatchSetting> =>
  requestAPI.put(`/match-settings/${params.id}`, params);

export const deleteMatchSetting = (id: number): Promise<void> => requestAPI.delete(`/match-settings/${id}`);
