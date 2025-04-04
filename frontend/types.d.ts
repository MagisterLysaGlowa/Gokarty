export interface GokartData {
  gokartId: number;
  name: string;
}

export interface GokartFormData {
  name: string;
}

export interface QueueData {
  queueId: number;
  tournamentId: number;
  playerId: number;
  queuePosition: number;
  tournament: TournamentData;
  player: PlayerData;
  gokartId: number;
  gokart: GokartData;
}

export interface QueueFormData {
  tournamentId: number;
  gokartIds: number[];
  numberOfRidesInOneGokart: number;
}

export interface TournamentData {
  tournamentId: number;
  name: string;
  startDate: Date;
  endDate: Date;
  tournamentStateId: number;
  tournamentType: TournamentType;
}

export interface TournamentType {
  tournamentTypeId: number;
  name: string;
}

export interface TournamentFormData {
  name: string;
  startDate: Date;
  endDate: Date;
  tournamentStateId: number;
  tournamentTypeId: number;
}

export interface PlayerFormData {
  name: string;
  surname: string;
  birthDate: Date;
  school: SchoolData;
  class: Class;
}

export interface PlayerData {
  playerId: number;
  name: string;
  surname: string;
  birthDate: Date;
  school: SchoolData;
  class: Class;
}

export interface PlayerWithRides {
  player: PlayerData;
  rides: RideData[];
}

interface PlayerFilterFormData {
  name: string;
  surname: string;
  schoolId: number;
  tournamentId: number;
}

export interface Class {
  classId: number;
  name: string;
}

export interface SchoolData {
  schoolId: number;
  name: string;
  city: string;
  acronym: string;
}

export interface SchoolFormData {
  name: string;
  city: string;
  acronym: string;
}

export interface RideFormData {
  tournamentId: number;
  playerId: number;
  gokartId: number;
  time: number;
  isDisqualified: number;
  penaltyPoints: number;
}

export interface RideAndPersonData {
  rideGroupId: number;
  rideData: RideData;
  player: PlayerData;
}

export interface RideData {
  gokart: GokartData;
  rideNumber: number;
  time: number;
  rideId: number;
  isDisqualified: boolean;
  penaltyPoints: number;
}


export type ModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onOpen: () => void;
};

export type TableActionButtonProps = {
  size?: "sm" | "md" | "lg";
  endContent?: React.ReactNode;
  variant?: "flat" | "solid" | "bordered" | "light" | "faded" | "shadow" | "ghost";
  color?: "default" | "primary" | "secondary" | "success" | "warning" | "danger";
  className?: string;
  isIconOnly?: boolean;
}

export type TableActionProps = {
  modal: ModalProps;
  buttonProps: TableActionButtonProps;
}
