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
