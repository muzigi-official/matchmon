import requestAPI from '@/utils/api';

export const fetchMatchSettings = (competitionId: number): Promise<IUpdateMatchSettingParams[]> =>
  requestAPI.get(`/match-settings?competitionId=${competitionId}`);

export const createMatchSetting = (params: ICreateMatchSettingParams): Promise<IUpdateMatchSettingParams> =>
  requestAPI.post(`/match-settings`, params);

export const updateMatchSetting = (params: IUpdateMatchSettingParams): Promise<IUpdateMatchSettingParams> =>
  requestAPI.put(`/match-settings/${params.id}`, params);

export const deleteMatchSetting = (id: number): Promise<void> => requestAPI.delete(`/match-settings/${id}`);
