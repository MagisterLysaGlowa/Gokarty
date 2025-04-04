import {
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "react-query";
import PlayerService from "../services/player";
import {
  PlayerDataDeleted,
  PlayerFilterFormData,
  PlayerFormData,
  PlayerData,
} from "../../types";
import {
  addPlayerToTournament,
  createPlayerTexts,
  promiseToast,
  removePlayerTexts,
  updatePlayerTexts,
} from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess } from "./queryUtils";

const useGetPlayerByID = (
  id: number,
  options?: UseQueryOptions<PlayerDataDeleted, Error>
) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: async () => await PlayerService.getPlayer(id),
    enabled: !!id,
    ...options,
  });
};

const useCreatePlayer = (
  options?: UseMutationOptions<
    PlayerFormData,
    Error,
    { tournamentId: number; data: PlayerFormData }
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ data }) => {
      return await promiseToast(
        PlayerService.createPlayer(data),
        createPlayerTexts
      );
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["players"]],
      options?.onSuccess
    ),
  });
};

const useUpdatePlayer = (
  options?: UseMutationOptions<
    PlayerDataDeleted,
    Error,
    { playerId: number; data: PlayerFormData }
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ playerId, data }) => {
      return await promiseToast(
        PlayerService.updatePlayer(playerId, data),
        updatePlayerTexts
      );
    },
    onSuccess: (r, v, c) =>
      handleSuccessWithRefreshOnSuccess(
        [["player", r.playerId]],
        options?.onSuccess
      )(r, v, c),
  });
};

const useRemovePlayer = (
  options?: UseMutationOptions<number, Error, number>
) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await promiseToast(
        PlayerService.removePlayer(id),
        removePlayerTexts
      );
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["players"]],
      options?.onSuccess
    ),
  });
};

const useGetPlayersForTournament = (
  tournamentId: number,
  options?: UseQueryOptions<PlayerDataDeleted[], Error>
) => {
  return useQuery({
    queryKey: ["players" + "tournament", tournamentId],
    queryFn: async () =>
      await PlayerService.getPlayersForTournament(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useGetPlayersForTournamentWithSchool = (
  tournamentId: number,
  options?: UseQueryOptions<PlayerData[], Error>
) => {
  return useQuery({
    queryKey: ["players" + "tournament" + "withSchool", tournamentId],
    queryFn: async () =>
      await PlayerService.getPlayersForTournamentWithSchool(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useFilterPlayers = (
  data: PlayerFilterFormData,
  options?: UseQueryOptions<PlayerData[], Error>
) => {
  return useQuery({
    queryKey: ["players" + "filter"],
    queryFn: async () => await PlayerService.filterPlayers(data),
    enabled: !!data,
    ...options,
  });
};

const useAddPlayerToTournament = (
  options?: UseMutationOptions<
    number,
    Error,
    { tournamentId: number; playerId: number }
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ tournamentId, playerId }) => {
      return await promiseToast(
        PlayerService.addPlayerToTournament(tournamentId, playerId),
        addPlayerToTournament
      );
    },
    //Todo: do sprawdzenia
    onSuccess: (r, v, c) => {
      handleSuccessWithRefreshOnSuccess(
        [["players" + "tournament" + "withSchool"], ["players" + "filter"]],
        options?.onSuccess
      )(r, v, c);
    },
  });
};

const useRemovePlayerFromTournament = (
  options?: UseMutationOptions<
    number,
    Error,
    { tournamentId: number; playerId: number }
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ tournamentId, playerId }) => {
      return await promiseToast(
        PlayerService.removePlayerFromTournament(tournamentId, playerId),
        removePlayerTexts
      );
    },
    onSuccess: (r, v, c) =>
      handleSuccessWithRefreshOnSuccess(
        [
          ["players" + "tournament" + "withSchool"],
          ["playerstournamentwithSchool", v.tournamentId],
        ],
        options?.onSuccess
      )(r, v, c),
  });
};

export const PlayerQueries = {
  getPlayer: useGetPlayerByID,
  createPlayer: useCreatePlayer,
  updatePlayer: useUpdatePlayer,
  removePlayer: useRemovePlayer,
  getPlayersForTournament: useGetPlayersForTournament,
  getPlayersForTournamentWithSchool: useGetPlayersForTournamentWithSchool,
  filterPlayers: useFilterPlayers,
  addPlayerToTournament: useAddPlayerToTournament,
  removePlayerFromTournament: useRemovePlayerFromTournament,
};
