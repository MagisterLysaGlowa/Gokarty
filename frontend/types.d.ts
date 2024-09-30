export interface LoginFormData {
  login: string;
  password: string;
}

export interface TournamentFormData {
  name: string;
  startDate: Date;
  endDate: Date;
  tournamentStateId: number;
}

export interface PlayerFormData {
  name: string;
  surname: string;
  birthDate: Date;
  schoolId: number;
}

export interface PlayerFilterFormData {
  name: string;
  surname: string;
  schoolId: number;
}

export interface SchoolFormData {
  name: string;
  city: string;
  acronym: string;
}

export interface GokartFormData {
  name: string;
}

export interface RideFormData {
  tournamentId: number;
  playerId: number;
  gokartId: number;
  time: number;
  isDisqualified: number;
}

export interface QueueFormData {
  tournamentId: number;
  gokartIds: Array<number>;
  numberOfRidesInOneGokart: number;
}

export interface UserData {
  userId: number;
  login: string;
  access: string;
}

export interface TournamentData {
  tournamentId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  tournamentStateId: number;
}

export interface TournamentFullData {
  tournamentId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  tournamentStateId: number;
}

export interface PlayerData {
  playerId: number;
  name: string;
  surname: string;
  birthDate: Date;
  schoolId: number;
}

export interface SchoolData {
  schoolId: number;
  name: string;
  city: string;
  acronym: string;
}

export interface PlayerWithSchoolData {
  playerId: number;
  name: string;
  surname: string;
  birthDate: Date;
  school: SchoolData;
}

export interface GokartData {
  gokartId: number;
  name: string;
}

export interface RideData {
  rideId: number;
  tournamentId: number;
  playerId: number;
  gokartId: number;
  time: number;
  rideNumber: number;
  isDisqualified: boolean;
}

export interface FullRideData {
  rideId: number;
  tournamentId: number;
  playerId: number;
  gokartId: number;
  time: number;
  rideNumber: number;
  tournament: TournamentData;
  player: PlayerWithSchoolData;
  gokart: GokartData;
  isDisqualified: boolean;
}

export interface RideStatusData {
  rideStatusId: number;
  state: string;
}

export interface QueueData {
  queueId: number;
  tournamentId: number;
  playerId: number;
  queuePosition: number;
  rideStatusId: number;
  gokartId: number;
}

export interface FullQueueData {
  queueId: number;
  tournamentId: number;
  playerId: number;
  queuePosition: number;
  rideStatusId: number;
  tournament: TournamentData;
  player: PlayerWithSchoolData;
  rideStatus: RideStatusData;
  gokartId: number;
  gokart: GokartData;
}

export interface Time {
    ms: number;
    s: number;
    m: number;
    h: number;
}

export interface PhotoCellData {
  lapCount: number;
  lapsLeft: number;
  time: Time;
  startPermission: boolean;
  photocell1Activ: boolean;
  photocell2Activ: boolean;
  photocell3Activ: boolean;
}