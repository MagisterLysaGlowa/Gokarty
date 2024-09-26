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

export interface PlayerWithSchoolData {
  playerId: number;
  name: string;
  surname: string;
  birthDate: Date;
  schoolId: number;
  schoolName: string;
  city: string;
  acronym: string;
}
