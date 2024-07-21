declare global {
  type TAnchor = 'top' | 'left' | 'bottom' | 'right';
  type TGender = 'M' | 'F' | 'A';
  type TButtonVariant = 'text' | 'contained' | 'outlined';
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

  interface ICompetitionFormInput {
    name: string;
    address: string;
    phoneNumber: string;
    startDate: Date;
    endDate: Date;
    organizer: string;
  }

  interface ISelectProperty {
    value: string | number | undefined;
    text: string;
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

  export interface IMatchSetting {
    id: number;
    competitionId: number;
    hasHalves: boolean;
    matchDuration: number;
    stadiumCount: number;
    stage: string;
  }

  interface ICreateMatchSettingParams {
    competitionId: number;
    hasHalves: boolean;
    matchDuration: number;
    stadiumCount: number;
    stage: string;
  }

  interface IUpdateMatchSettingParams extends ICreateMatchSettingParams {
    id: number;
  }
}

export {};
