import { useMutation, useQuery, UseQueryOptions } from "react-query";
import RideService from "../services/ride";
import { RideAndPersonData, RideData, RideFormData, RideGroup } from "../../types";
import { successToast } from "../Utils/ToastNotifications";
import {
  handleError,
  handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess,
  MutationType,
} from "./queryUtils";

const useGetTournamentBestFullRides = (
  tournamentId: number,
  options?: UseQueryOptions<RideAndPersonData[], Error>
) => {
  return useQuery({
    queryKey: ["tournamentBestFullRides", tournamentId],
    queryFn: async () => await RideService.getTournamentBestRides(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useGetTournamentLastFullRide = (
  tournamentId: number,
  options?: UseQueryOptions<RideAndPersonData, Error>
) => {
  return useQuery({
    queryKey: ["tournamentLastFullRide", tournamentId],
    queryFn: async () => await RideService.getTournamentLastRide(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useCreateRide = (options?: MutationType<RideFormData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data: RideFormData) => {
      return await RideService.create(data, "/ride");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess([["rides"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
  });
};

const useUpdateRide = (options?: MutationType<RideData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      return await RideService.update(data, "/ride");
    },
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess([["ride"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
  });
};

const useRemoveRide = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await RideService.remove(id, "/ride");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess([["rides"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
  });
};

const useGetPlayersWithTimes = (
  tournamentId: number,
  options?: UseQueryOptions<RideGroup[], Error>
) => {
  return useQuery({
    queryKey: ["playersWithTimes", tournamentId],
    queryFn: async () =>
      await RideService.getAllRidesForTournament(tournamentId),
    ...options,
  });
};

export const RideQueries = {
  createRide: useCreateRide,
  updateRide: useUpdateRide,
  removeRide: useRemoveRide,
  getTournamentBestFullRides: useGetTournamentBestFullRides,
  getTournamentLastFullRide: useGetTournamentLastFullRide,
  getAllPlayersWithTimes: useGetPlayersWithTimes,
};
