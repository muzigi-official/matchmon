import requestAPI from '@/utils/api';

export const fetchMatchSettings = (competitionId: number): Promise<IMatchSettingParams[]> =>
  requestAPI.get(`/match-settings?competitionId=${competitionId}`);

export const createMatchSetting = (params: ICreateMatchSettingParams): Promise<IMatchSettingParams> =>
  requestAPI.post(`/match-settings`, params);

export const updateMatchSetting = (params: IMatchSettingParams): Promise<IMatchSettingParams> =>
  requestAPI.put(`/match-settings/${params.id}`, params);

export const deleteMatchSetting = (id: number): Promise<void> => requestAPI.delete(`/match-settings/${id}`);
