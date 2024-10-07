import { UseMutationResult } from "react-query";
import { SchoolData, TournamentData, TournamentFormData } from "../../../types";

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

export const compareFunction = (a: SchoolData, b: SchoolData) => {
  const textA = a.acronym.toUpperCase();
  const textB = b.acronym.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

export const resetPlayerData = () => {
  return {
    birthDate: new Date(),
    name: "",
    playerId: -1,
    schoolId: -1,
    surname: "",
  };
};

export const updateTournamentState = async (
  tournament: TournamentData,
  updateTournamentMutate: UseMutationResult<
    unknown,
    unknown,
    TournamentFormData,
    unknown
  >
) => {
  if (tournament.tournamentStateId == 1) {
    await updateTournamentMutate.mutateAsync({
      ...tournament,
      tournamentStateId: tournament.tournamentStateId + 1,
      startDate: new Date(),
    });
  } else if (tournament.tournamentStateId == 2) {
    await updateTournamentMutate.mutateAsync({
      ...tournament,
      tournamentStateId: tournament.tournamentStateId + 1,
      endDate: new Date(),
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
