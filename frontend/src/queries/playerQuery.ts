import {
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "react-query";
import PlayerService from "../services/player";
import {
  PlayerData,
  PlayerFilterFormData,
  PlayerFormData,
  PlayerWithSchoolData,
} from "../../types";
import {
  addPlayerToTournament,
  createPlayerTexts,
  promiseToast,
  removePlayerTexts,
  updatePlayerTexts,
} from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess } from "./queryUtils";

const useGetAllPlayers = (options?: UseQueryOptions<PlayerData[], Error>) => {
  return useQuery({
    queryKey: ["players"],
    queryFn: PlayerService.getAllPlayers,
    ...options,
  });
};

const useGetPlayerByID = (
  id: number,
  options?: UseQueryOptions<PlayerData, Error>
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
    PlayerData,
    Error,
    { tournamentId: number; data: PlayerFormData }
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ tournamentId, data }) => {
      return await promiseToast(
        PlayerService.createPlayer(tournamentId, data),
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
    PlayerData,
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
  options?: UseQueryOptions<PlayerData[], Error>
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
  options?: UseQueryOptions<PlayerWithSchoolData[], Error>
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
  options?: UseQueryOptions<PlayerWithSchoolData[], Error>
) => {
  return useQuery({
    queryKey: ["players" + "filter", data],
    queryFn: async () => await PlayerService.filterPlayers(data),
    enabled: !!data,
    ...options,
  });
};

const useAddPlayerToTournament = (
  filter?: PlayerFilterFormData,
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
      console.log(filter);

      handleSuccessWithRefreshOnSuccess(
        [
          ["players" + "tournament" + "withSchool"],
          ["players" + "filter", filter],
        ],
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
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["players" + "tournament" + "withSchool"]],
      options?.onSuccess
    ),
  });
};

export const PlayerQueries = {
  getAllPlayers: useGetAllPlayers,
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
