import requestAPI from '@/utils/api';

// ⚠️ 레거시 /match-schedules 라우트는 백엔드에서 제거됨(2026-10-16).
// "일정"은 competitions/:competitionId/matches(Match)로 통합됨.
//
// 매핑:
// - 목록 조회      → fetchMatchResultsList (api/matchResult.ts, GET /competitions/:cid/matches)
// - 단건 수정/삭제  → 아래 updateMatchSchedule / deleteMatchSchedule (경기 정보 수정/삭제)
// - bulk 생성/수정  → 백엔드 대응 엔드포인트 없음 → 아래 TODO (백엔드 협의 필요)

// 경기(일정) 정보 단건 수정: PUT /competitions/:competitionId/matches/:matchId
export const updateMatchSchedule = (competitionId: number, data: IMatchScheduleDto): Promise<IMatchSchedule> =>
  requestAPI.put(`/competitions/${competitionId}/matches/${data.id}`, data);

// 경기(일정) 삭제: DELETE /competitions/:competitionId/matches/:matchId
export const deleteMatchSchedule = (competitionId: number, matchId: number): Promise<void> =>
  requestAPI.delete(`/competitions/${competitionId}/matches/${matchId}`);

// TODO(백엔드 협의 필요): 아래 bulk 계열은 현재 백엔드에 대응 엔드포인트가 없음.
// 경기 생성은 건별로 POST /competitions/:id/matches/group-stage | /tournament 를 사용해야 함.
// bulk 생성/수정/전체삭제가 필요하면 백엔드에 bulk 엔드포인트 추가를 요청할 것.
// 아래 함수들은 호출 시 404가 나므로, bracket 화면에서 사용 중단/대체 전까지 임시로 남겨둔다.

export const createScheduleBulk = (
  competitionId: number,
  params: ICreateScheduleBulkDto[],
): Promise<IMatchScheduleDto[]> => {
  // TODO: 백엔드 bulk 엔드포인트 없음. 건별 생성(group-stage/tournament)으로 대체 필요.
  return requestAPI.post(`/competitions/${competitionId}/matches/bulk-schedule`, params);
};

export const updateBulkMatchSchedules = (
  competitionId: number,
  data: IMatchScheduleDto[],
): Promise<IMatchScheduleDto[]> => {
  // TODO: 백엔드 bulk 엔드포인트 없음.
  return requestAPI.put(`/competitions/${competitionId}/matches/bulk`, data);
};

export const deleteMatchSchedulesByCompetitionId = (competitionId: number): Promise<void> => {
  // TODO: 백엔드 전체삭제 엔드포인트 없음.
  return requestAPI.delete(`/competitions/${competitionId}/matches`);
};
