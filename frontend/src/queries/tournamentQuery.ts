import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import TournamentService from "../services/tournament";
import { TournamentData, TournamentFormData } from "../../types";
import {
  createTournamentTexts,
  promiseToast,
  removeTournamentTexts,
  updateTournamentTexts,
} from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess } from "./queryUtils";

const useGetAllTournaments = (
  options?: UseQueryOptions<TournamentData[], Error>
) => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: TournamentService.getAllTournaments,
    ...options,
  });
};

const useGetTournamentByID = (
  id: number,
  options?: UseQueryOptions<TournamentData, Error>
) => {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: async () => await TournamentService.getTournament(id),
    enabled: !!id,
    ...options,
  });
};

const useCreateTournament = (
  options?: UseMutationOptions<TournamentData, Error, TournamentFormData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: TournamentFormData) => {
      return await promiseToast(
        TournamentService.createTournament(data),
        createTournamentTexts
      );
    },
    onSuccess: handleSuccessWithRefreshWithOnSuccess(
      [["tournaments"]],
      options?.onSuccess
    ),
  });
};

const useUpdateTournament = (
  options?: UseMutationOptions<TournamentData, Error, TournamentData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: TournamentData) => {
      return await promiseToast(
        TournamentService.updateTournament(data.tournamentId, data),
        updateTournamentTexts
      );
    },
    onSuccess: (r, v, c) => {
      handleSuccessWithRefreshWithOnSuccess(
        [["tournament", r.tournamentId]],
        options?.onSuccess
      )(r, v, c);
    },
  });
};

const useRemoveTournament = (
  options?: UseMutationOptions<number, Error, number>
) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await promiseToast(
        TournamentService.removeTournament(id),
        removeTournamentTexts
      );
    },
    onSuccess: handleSuccessWithRefreshWithOnSuccess(
      [["tournaments"]],
      options?.onSuccess
    ),
  });
};

export const TournamentQueries = {
  getAllTournaments: useGetAllTournaments,
  getTournament: useGetTournamentByID,
  createTournament: useCreateTournament,
  updateTournament: useUpdateTournament,
  removeTournament: useRemoveTournament,
};
