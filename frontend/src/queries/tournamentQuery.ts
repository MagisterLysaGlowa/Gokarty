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

const useCreateTournament = (options?: MutationType<{tournament: TournamentData, image?: File}>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("tournament", JSON.stringify(data.tournament));
      if(data.image)
        formData.append("image", data.image);
      return await TournamentService.create<TournamentData>(formData, "/tournament");
    },
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

const useUpdateTournament = (options?: MutationType<{tournament: TournamentData, image?: File}>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("tournament", JSON.stringify(data.tournament));
      if(data.image)
        formData.append("image", data.image);
      return await TournamentService.update<TournamentData>(formData, "/tournament");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshWithOnSuccess(
        [["tournament", vars.tournament.tournamentId]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useRemoveTournament = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id) => await TournamentService.remove(id, "/tournament"),
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

export const TournamentQueries = {
  getAllTournaments: useGetAllTournaments,
  getTournament: useGetTournament,
  createTournament: useCreateTournament,
  updateTournament: useUpdateTournament,
  removeTournament: useRemoveTournament,
};
