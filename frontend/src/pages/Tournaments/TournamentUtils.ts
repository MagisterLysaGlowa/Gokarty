import { TournamentFormData } from "../../../types";

export const resetTournamentValues: TournamentFormData = {
  name: "",
  endDate: new Date(),
  startDate: new Date(),
  tournamentStateId: 1,
  tournamentTypeId: 1,
};
