import { TournamentData, TournamentFormData } from "../../../types";
import { queryClient } from "../../Utils/ReactQueryConfig";

export const resetTournamentValues: TournamentFormData = {
  name: "",
  endDate: new Date(),
  startDate: new Date(),
  tournamentStateId: 1,
};

export const addTournamentToList = (tournament: TournamentData) => {
  queryClient.setQueryData(
    "getTournaments",
    (prev: TournamentData[] | undefined) => {
      return prev ? [...prev, tournament] : [];
    }
  );
};

export const updateTournament = (tournament: TournamentData) => {
  queryClient.setQueryData("editTournament", tournament);
};
