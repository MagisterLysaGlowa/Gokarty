export interface GokartData {
  gokartId?: number;
  name: string;
}

export interface QueueData {
  queueId: number;
  tournamentId: number;
  tournament: TournamentData;
  playerId: number;
  player: PlayerData;
  queuePosition: number;
  gokartId: number;
  gokart: GokartData;
}

export interface QueueFormData {
  tournamentId: number;
  gokartIds: number[];
  numberOfRidesInOneGokart: number;
}

export interface TournamentData {
  tournamentId?: number;
  name: string;
  startDate: Date;
  endDate: Date;
  tournamentStateId: number;
  tournamentTypeId: number;
  tournamentState?: TournamentState;
  tournamentType?: TournamentType;
}

export interface TournamentState {
  turnamentStateId?: number;
  state: string;
}

export interface TournamentType {
  tournamentTypeId?: number;
  name: string;
}

export interface PlayerData {
  playerId?: number;
  name: string;
  surname: string;
  birthDate: Date;
  classId: number;
  class?: Class;
}

export interface PlayerFilterFormData {
  name: string;
  surname: string;
  schoolId?: number;
  tournamentId: number;
}

export interface Class {
  classId?: number;
  name: string;
  schoolId: number;
  school?: SchoolData;
}

export interface SchoolData {
  schoolId?: number;
  name: string;
  city: string;
  acronym: string;
}

export interface RideFormData {
  deleteQueueId: number;
  tournamentId: number;
  playerId: number;
  gokartId: number;
  classId: number;
  time: number;
  isDisqualified: number;
  penaltyPoints: number;
}

export interface RideAndPersonData {
  ride: RideData;
  playerId: number;
  player: PlayerData;
  classId: number;
  class: Class;
  tournamentId: number;
  tournament: TournamentData;
}

export type RideGroup = {
  rideGroupId: number;
  rides: RideData[];
  playerId: number;
  player: PlayerData;
  classId: number;
  class: Class;
  tournamentId: number;
  tournament: TournamentData;
};

export interface RideData {
  gokartId: number;
  gokart?: GokartData;
  rideNumber: number;
  time: number;
  rideId: number;
  isDisqualified: boolean;
  penaltyPoints: number;
  rideGroupId: number;
}

export type ModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
};

export type TableActionButtonProps = {
  size?: "sm" | "md" | "lg";
  endContent?: React.ReactNode;
  variant?:
    | "flat"
    | "solid"
    | "bordered"
    | "light"
    | "faded"
    | "shadow"
    | "ghost";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger";
  className?: string;
  isIconOnly?: boolean;
};

export type TableActionProps = {
  modal: ModalProps;
  buttonProps: TableActionButtonProps;
};
