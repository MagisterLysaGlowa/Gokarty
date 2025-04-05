import { UseQueryOptions, useMutation, useQuery } from "react-query";
import PlayerService from "../services/player";
import { PlayerFilterFormData, PlayerData } from "../../types";
import { successToast } from "../Utils/ToastNotifications";
import {
  handleError,
  handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess,
  MutationType,
} from "./queryUtils";

const useGetPlayerByID = (
  id: number,
  options?: UseQueryOptions<PlayerData, Error>
) => {
  return useQuery({
    queryKey: ["player", id],
    queryFn: async () => await PlayerService.get<PlayerData>(id, "/player"),
    enabled: !!id,
    ...options,
  });
};

const useCreatePlayer = (options?: MutationType<PlayerData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      return await PlayerService.create(data, "/player");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess([["players"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
  });
};

const useUpdatePlayer = (options?: MutationType<PlayerData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      return await PlayerService.update(data, "/player");
    },
    onError: handleError,
    onSuccess: (r, v, c) => {
      successToast(r.message);
      handleSuccessWithRefreshOnSuccess(
        [["player", v.playerId]],
        options?.onSuccess
      )(r, v, c);
    },
  });
};

const useRemovePlayer = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id) => {
      return await PlayerService.remove(id, "/player");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess([["players"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
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
  options?: MutationType<{ tournamentId: number; playerId: number }>
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ tournamentId, playerId }) => {
      return await PlayerService.addPlayerToTournament(tournamentId, playerId);
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["players" + "tournament" + "withSchool"], ["players" + "filter"]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useRemovePlayerFromTournament = (
  options?: MutationType<{ tournamentId: number; playerId: number }>
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ tournamentId, playerId }) => {
      return await PlayerService.removePlayerFromTournament(
        tournamentId,
        playerId
      );
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [
          ["players" + "tournament"],
          ["playerstournament", vars.tournamentId],
        ],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

export const PlayerQueries = {
  getPlayer: useGetPlayerByID,
  createPlayer: useCreatePlayer,
  updatePlayer: useUpdatePlayer,
  removePlayer: useRemovePlayer,
  getPlayersForTournament: useGetPlayersForTournament,
  filterPlayers: useFilterPlayers,
  addPlayerToTournament: useAddPlayerToTournament,
  removePlayerFromTournament: useRemovePlayerFromTournament,
};
