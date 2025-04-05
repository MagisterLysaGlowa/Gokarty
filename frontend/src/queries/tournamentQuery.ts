import { useMutation, useQuery, UseQueryOptions } from "react-query";
import TournamentService from "../services/tournament";
import { TournamentData } from "../../types";
import { successToast } from "../Utils/ToastNotifications";
import {
  handleError,
  handleSuccessWithRefreshWithOnSuccess,
  MutationType,
} from "./queryUtils";

const useGetAllTournaments = (
  options?: UseQueryOptions<TournamentData[], Error>
) => {
  return useQuery({
    queryKey: ["tournaments"],
    queryFn: () => TournamentService.getAll<TournamentData>("/tournament"),
    ...options,
  });
};

const useGetTournament = (
  id: number,
  options?: UseQueryOptions<TournamentData, Error>
) => {
  return useQuery({
    queryKey: ["tournament", id],
    queryFn: async () =>
      await TournamentService.get<TournamentData>(id, "/tournament"),
    enabled: !!id,
    ...options,
  });
};

const useCreateTournament = (options?: MutationType<TournamentData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) =>
      await TournamentService.create<TournamentData>(data, "/tournament"),
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshWithOnSuccess(
        [["tournaments"]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useUpdateTournament = (options?: MutationType<TournamentData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) =>
      await TournamentService.update<TournamentData>(data, "/tournament"),
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshWithOnSuccess(
        [["tournament", vars.tournamentId]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useRemoveTournament = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id) => await TournamentService.remove(id, "/tournament"),
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshWithOnSuccess(
        [["tournaments"]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

export const TournamentQueries = {
  getAllTournaments: useGetAllTournaments,
  getTournament: useGetTournament,
  createTournament: useCreateTournament,
  updateTournament: useUpdateTournament,
  removeTournament: useRemoveTournament,
};
