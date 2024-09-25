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

export interface UserData {
  userId: number;
  login: string;
  access: string;
}
