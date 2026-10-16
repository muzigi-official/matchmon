declare global {
  type TAnchor = 'top' | 'left' | 'bottom' | 'right';
  type TGender = 'M' | 'F' | 'A';
  type TButtonVariant = 'text' | 'contained' | 'outlined' | 'fab';
  type TUserRole = 'admin' | 'competitionUser' | 'user';
  type TDefaultReturn = string;
  type TMatchResult = 'HOME_WIN' | 'AWAY_WIN' | 'DRAW';
  type TMatchResultState = 'COMPLETED' | 'PENDING_RESULT' | 'WAITING';
  type TGoalEvent = 'GOAL' | 'OWN_GOAL' | 'PENALTY';

  interface IErrorResponse {
    message: string;
  }

  interface INavItem {
    path: string;
    name: string;
    icon?: React.ReactElement;
  }

  interface IUser {
    auth: number;
    exp: number;
    iat: number;
    userId: number;
    username: string;
    role: TUserRole;
  }

  interface IPlayer {
    id?: number;
    nickName: string;
    picture?: string | null;
    uniformNumber?: number;
    role: number;
    isAttend?: boolean;
    team?: {
      id: number;
      name: string;
    };
  }

  interface IParsePlayer {
    id: number;
    nickName: string;
    picture?: string;
    uniformNumber: number;
    role: number;
    teamId: number | string;
    teamName: string;
  }

  interface ICompetition {
    id?: number | string;
    name: string;
    address: string;
    poster: string;
    startDate: string;
    endDate: string;
    description: string;
    phoneNumber: string;
    organizer: string;
  }

  interface ICompetitionFormInput {
    name: string;
    address: string;
    phoneNumber: string;
    startDate: Date; // Date 객체 사용
    endDate: Date; // Date 객체 사용
    organizer: string;
  }

  interface IListCompetitionResponse {
    data: ICompetition[];
    meta: {
      total: number;
      page: number;
      last_page: number;
    };
  }

  // 특정 팀이 Competition에 신청할 때 사용하는 DTO
  interface IApplyCompetitionDto {
    competitionId: number;
    teamId: number | string;
  }

  interface IJoinTeamComps {
    id?: number;
    joinCompId: number;
    name: string;
    teamId: number;
    participateState: string;
    group: string;
    emblem?: string;
  }

  export interface ICompetitionPlayer {
    id: number;
    nickName: string;
    uniformNumber: number;
    picture: string;
    role: number;
    createdAt: string;
    isActive: boolean;
  }

  export interface ICompetitionTeam {
    id: number;
    name: string;
    location: string;
    emblem: string;
    gender: string;
    isActive: boolean;
    players: ICompetitionPlayer[];
  }

  interface ITournaments {
    [groupKey: string]: TTournament;
  }

  type TTournament = ITournamentNode[];

  interface ITournamentNode {
    groupKey: string;
    size: number; // 2, 4, 8, 16, 32, 64
    round: number; // 2, 4, 8, 16, 32, 64
    gameOrder: number; // 0~1, 0~3
  }

  interface IPlayerBase {
    nickName: string;
    picture?: string;
    uniformNumber?: number | null;
  }

  interface ICreatePlayerDto extends IPlayerBase {
    teamId: number;
  }

  interface IUpdatePlayerDto extends IPlayerBase {
    id: number;
    role: number;
  }

  interface IPlayerFormInput extends IPlayerBase {
    id?: number;
    role?: number;
    teamId?: number | string;
  }

  interface IListPlayerResponse {
    data: IPlayer[];
    meta: {
      total: number;
      page: number;
      last_page: number;
    };
  }

  interface IGetPlayerResponse {
    player: IPlayer;
  }

  class Coordinate {
    x: number;
    y: number;

    constructor(x: number, y: number) {
      this.x = x;
      this.y = y;
    }

    add(coordinate: Coordinate) {
      this.x += coordinate.x;
      this.y += coordinate.y;
      return this;
    }
    sub(coordinate: Coordinate) {
      this.x -= coordinate.x;
      this.y -= coordinate.y;
      return this;
    }
  }

  interface ITeamBase {
    name: string;
    location: string;
    emblem: string;
    gender: string;
  }

  interface ITeam extends ITeamBase {
    id: number;
    isActive?: boolean;
    players?: IPlayer[];
  }

  interface ITeamFormInput extends ITeamBase {}

  interface IUpdateTeamDto extends ITeamBase {
    teamId: number;
  }

  interface IListTeamResponse {
    data: ITeam[];
    meta: {
      total: number;
      page: number;
      last_page: number;
    };
  }

  interface ISelectProperty {
    value: string | number;
    text: string;
    group?: string;
  }

  interface IApplyFormInput {
    teamId: number | string;
  }

  interface IGroupStage {
    id: number;
    name: string;
    competitionId: number;
    joinTeamComps: IJoinTeamComps[];
    createdAt: Date;
  }

  interface IGroup {
    id: number;
    name: string;
    teams: ITeam[];
  }

  interface IJoinTeamComps {
    id: number;
    teamId: number;
    name: string;
    emblem: string;
    participateState: string;
    group: string;
  }

  interface IListJoinTeamCompResponse {
    id: number;
    competition: ICompetition;
    team: ITeam;
    participateState: string;
    groupStage: IGroupStage;
  }

  interface IToggleJoinTeamCompDto {
    participantId: number;
    playerId: number;
  }

  interface ICreateMatchSettingParams {
    hasHalves: boolean;
    matchDuration: number;
    stadiumCount: number;
    stage: string;
  }

  interface IMatchSettingParams extends ICreateMatchSettingParams {
    id?: number;
    competitionId?: number;
  }

  interface IScheduleParams {
    startTime: string; // 시작 시간 (HH:mm 형식)
    matchDuration: number; // 경기 시간 (분)
    breakTime: number; // 휴식 시간 (분)
    stadiums: string[]; // 구장 목록
    groups: Record<string, ITeam[]>; // 조 목록 (조 이름을 키로, 팀 목록을 값으로)
  }

  export interface IMatchSchedule {
    round?: ITournamentRound;
    groupStage?: IGroupStage;
    homeTeamId: number | null;
    awayTeamId: number | null;
    homeTeamName?: string; // 팀 이름 추가
    awayTeamName?: string; // 팀 이름 추가
    matchTime: string;
    stadium: string;
  }

  export interface IMatchScheduleDto {
    id?: number;
    round?: number;
    groupStage?: number;
    homeTeamId: number;
    awayTeamId: number;
    homeTeamName?: string; // 팀 이름 추가
    awayTeamName?: string; // 팀 이름 추가
    matchTime: string;
    stadium: string;
    isTemporary?: boolean;
  }

  export interface ICreateScheduleBulkDto {
    matchTime: string;
    stadium: string;
  }

  // 경기(일정/정보) — 백엔드 Match
  export interface IMatchDto {
    id: number;
    roundId?: number;
    groupStageId?: number;
    competitionId: number;
    homeParticipantId: number;
    awayParticipantId: number;
    homeParticipantName: string;
    awayParticipantName: string;
    stadium: string;
    matchDate: string; // 'YYYY-MM-DD'
    matchTime: string; // 'HH:mm'
    createdAt: string;
  }

  // 결과에 포함되는 득점자 정보
  export interface IGoalInResult {
    id: number;
    playerId: number;
    playerName: string; // player.nickName
    uniformNumber: number | null;
    teamId: number;
    teamName: string;
    minute: number;
    isOwnGoal: boolean;
  }

  export interface IMatchResultDto {
    match: IMatchDto;
    homeScore: number;
    awayScore: number;
    isPenaltyShootout: boolean;
    homePenaltyScore: number | null;
    awayPenaltyScore: number | null;
    result: TMatchResult | null;
    state: TMatchResultState;
    goals: IGoalInResult[];
  }

  // 경기 결과 생성/수정 바디 (matchId는 URL 경로로 전달하므로 바디에서 제외)
  export interface ICreateMatchResultDto {
    homeScore: number;
    awayScore: number;
    result?: TMatchResult | null;
    state: TMatchResultState;
    isPenaltyShootout: boolean;
    homePenaltyScore?: number | null;
    awayPenaltyScore?: number | null;
  }

  // 득점 기록 생성 바디
  export interface ICreateGoalDto {
    playerId: number;
    teamId?: number;
    minute?: number;
    event: TGoalEvent;
  }

  // 조별 순위
  export interface IStandingRow {
    teamId: number;
    teamName: string;
    participantId: number;
    played: number;
    won: number;
    draw: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
    points: number;
  }

  export interface IStandingsDto {
    competitionId: number;
    groupLabel: string;
    standings: IStandingRow[];
  }

  // 득점 랭킹
  export interface IScorerDto {
    playerId: number;
    playerName: string;
    teamName: string;
    goalCount: number;
  }
}

export {};
