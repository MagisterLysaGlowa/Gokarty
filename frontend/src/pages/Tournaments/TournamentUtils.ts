import { TournamentData } from "../../../types";

export const resetTournamentValues: TournamentData = {
  name: "",
  endDate: new Date(),
  startDate: new Date(),
  tournamentStateId: 1,
  tournamentTypeId: 1,
};
