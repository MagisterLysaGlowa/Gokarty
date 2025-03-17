import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import RideService from "../services/ride";
import {
  FullRideData,
  GokartData,
  PlayersWithTimes,
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

const useGetAllRides = (options?: UseQueryOptions<RideData[], Error>) => {
  return useQuery({
    queryKey: ["rides"],
    queryFn: RideService.getAllRides,
    ...options,
  });
};

const useGetRideByID = (
  id: number,
  options?: UseQueryOptions<RideData, Error>
) => {
  return useQuery({
    queryKey: ["ride", id],
    queryFn: async () => await RideService.getRide(id),
    enabled: !!id,
    ...options,
  });
};

const useGetAllFullRides = (
  options?: UseQueryOptions<FullRideData[], Error>
) => {
  return useQuery({
    queryKey: ["fullRides"],
    queryFn: RideService.getAllFullRides,
    ...options,
  });
};

const useGetFullRideByID = (
  id: number,
  options?: UseQueryOptions<FullRideData, Error>
) => {
  return useQuery({
    queryKey: ["fullRide", id],
    queryFn: async () => await RideService.getFullRide(id),
    enabled: !!id,
    ...options,
  });
};

const useGetTournamentBestFullRides = (
  tournamentId: number,
  options?: UseQueryOptions<FullRideData[], Error>
) => {
  return useQuery({
    queryKey: ["tournamentBestFullRides", tournamentId],
    queryFn: async () =>
      await RideService.getTournamentBestFullRides(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useGetTournamentLastFullRide = (
  tournamentId: number,
  options?: UseQueryOptions<FullRideData, Error>
) => {
  return useQuery({
    queryKey: ["tournamentLastFullRide", tournamentId],
    queryFn: async () =>
      await RideService.getTournamentLastFullRide(tournamentId),
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
  options?: UseQueryOptions<PlayersWithTimes[], Error>
) => {
  return useQuery({
    queryKey: ["playersWithTimes", tournamentId],
    queryFn: async () =>
      await RideService.getAllFullRidesForTournament(tournamentId),
    ...options,
  });
};

export const RideQueries = {
  getAllPlayersWithTimes: useGetPlayersWithTimes,
  getAllRides: useGetAllRides,
  getRide: useGetRideByID,
  getAllFullRides: useGetAllFullRides,
  getFullRide: useGetFullRideByID,
  getTournamentBestFullRides: useGetTournamentBestFullRides,
  getTournamentLastFullRide: useGetTournamentLastFullRide,
  createRide: useCreateRide,
  updateRide: useUpdateRide,
  removeRide: useRemoveRide,
};
