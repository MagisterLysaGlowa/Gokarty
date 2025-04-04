import { UseMutateAsyncFunction } from "react-query";
import { SchoolData, TournamentData } from "../../../types";

export const handleChange = <T extends object>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFunction: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setFunction((prev) => ({
    ...prev,
    [name]: !name.includes("Date") ? value : new Date(value),
  }));
};

export const schoolOrder = (a: SchoolData, b: SchoolData) => {
  const textA = a.acronym.toUpperCase();
  const textB = b.acronym.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

export const updateTournamentState = async (
  tournament: TournamentData,
  updateTournamentMutate: UseMutateAsyncFunction<
    TournamentData,
    Error,
    TournamentData,
    unknown
  >
) => {
  if (tournament.tournamentStateId == 1) {
    await updateTournamentMutate({
      ...tournament,
      tournamentStateId: tournament.tournamentStateId + 1,
    });
  } else if (tournament.tournamentStateId == 2) {
    await updateTournamentMutate({
      ...tournament,
      tournamentStateId: tournament.tournamentStateId + 1,
    });
  }
};

export const tournamentStringFromState = (tournament: TournamentData) => {
  return (
    "Czy na pewno chcesz " +
    (tournament.tournamentStateId == 1 ? "rozpocząć" : "zakończyć") +
    " te zawody?"
  );
};
