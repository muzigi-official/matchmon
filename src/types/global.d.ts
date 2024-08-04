declare global {
  type TAnchor = 'top' | 'left' | 'bottom' | 'right';
  type TGender = 'M' | 'F' | 'A';
  type TButtonVariant = 'text' | 'contained' | 'outlined' | 'fab';
  type TUserRole = 'admin' | 'competitionUser' | 'user';
  type TDefaultReturn = string;

  interface IErrorResponse {
    message: string;
  }

  interface INavItem {
    path: string;
    name: string;
    icon?: React.ReactElement;
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
    [x: string]: any;
    id?: number | string;
    name: string;
    address: string;
    poster: string;
    start_date: string;
    end_date: string;
    description: string;
    organizer: string;
  }

  interface IJoinCompTeam {
    id?: number;
    joinCompId: number;
    name: string;
    teamId: number;
    participateState: string;
    group: string;
    emblem?: string;
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

  interface IPlayerFormInput {
    id?: number;
    nickName: string;
    uniformNumber?: number | null;
    role?: number;
    picture?: string;
    teamId?: number | string;
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

  interface ITeam {
    id: number;
    name: string;
    location: string;
    emblem: string;
    gender: string;
    isActive?: boolean;
    players?: IPlayer[];
  }

  interface ITeamFormInput {
    name: string;
    gender: string;
    location: string;
    emblem: string;
  }

  interface ICreateTeamDto {
    name: string;
    location: string;
    emblem: string;
    gender: string;
  }

  interface IUpdateTeamDto {
    name: string;
    location: string;
    emblem: string;
    gender: string;
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

  interface ICompetitionFormInput {
    name: string;
    address: string;
    phoneNumber: string;
    startDate: Date;
    endDate: Date;
    organizer: string;
  }

  interface ISelectProperty {
    value: string | number;
    text: string;
    group?: string;
  }

  export interface IFormValues {
    customSelect: string | number | undefined;
  }

  interface IApplyFormInput {
    teamId: number | string;
  }

  interface IGroupStage {
    id: number;
    name: string;
    competitionId: number;
    joinTeamComps: IJoinCompTeam[];
    createdAt: Date;
  }

  interface IGroup {
    id: number;
    name: string;
    teams: ITeam[];
  }

  interface IJoinCompTeam {
    id: number;
    teamId: number;
    name: string;
    emblem: string;
    participateState: string;
    group: string;
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

  interface IListJoinTeamCompResponse {
    id: number;
    competition: ICompetition;
    team: ITeam;
    participateState: string;
    groupStage: IGroupStage;
  }

  interface IToggleJoinTeamDto {
    joinTeamCompId: number;
    playerId: number;
  }
}

export {};
