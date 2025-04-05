import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import RideService from "../services/ride";
import {
  GokartData,
  PlayerWithRides,
  RideData,
  RideFormData,
} from "../../types";
import {
  createRideTexts,
  promiseToast,
  removeRideTexts,
  updateRideTexts,
} from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess } from "./queryUtils";

const useGetTournamentBestFullRides = (
  tournamentId: number,
  options?: UseQueryOptions<RideData[], Error>
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
  options?: UseQueryOptions<RideData, Error>
) => {
  return useQuery({
    queryKey: ["tournamentLastFullRide", tournamentId],
    queryFn: async () => await RideService.getTournamentLastRide(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useCreateRide = (
  options?: UseMutationOptions<RideData, Error, RideFormData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: RideFormData) => {
      return await promiseToast(RideService.createRide(data), createRideTexts);
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["rides"]],
      options?.onSuccess
    ),
  });
};

const useUpdateRide = (
  options?: UseMutationOptions<
    GokartData,
    Error,
    { rideId: number; data: RideFormData }
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ rideId, data }) => {
      return await promiseToast(
        RideService.updateRide(rideId, data),
        updateRideTexts
      );
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["ride"]],
      options?.onSuccess
    ),
  });
};

const useRemoveRide = (options?: UseMutationOptions<number, Error, number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await promiseToast(RideService.removeRide(id), removeRideTexts);
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["rides"]],
      options?.onSuccess
    ),
  });
};

const useGetPlayersWithTimes = (
  tournamentId: number,
  options?: UseQueryOptions<PlayerWithRides[], Error>
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
