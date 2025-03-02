import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "react-query";
import QueueService from "../services/queue";
import {
  FullQueueData,
  PlayerData,
  QueueData,
  QueueFormData,
} from "../../types";
import { createQueueTexts, promiseToast } from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess } from "./queryUtils";

const useGetAllQueues = (options?: UseQueryOptions<QueueData[], Error>) => {
  return useQuery({
    queryKey: ["queues"],
    queryFn: QueueService.getAllQueues,
    ...options,
  });
};

const useGetQueue = (
  queueId: number,
  options?: UseQueryOptions<QueueData, Error>
) => {
  return useQuery({
    queryKey: ["queue", queueId],
    queryFn: () => QueueService.getQueue(queueId),
    enabled: !!queueId,
    ...options,
  });
};

const useGetAllFullQueues = (
  options?: UseQueryOptions<FullQueueData[], Error>
) => {
  return useQuery({
    queryKey: ["fullQueues"],
    queryFn: QueueService.getAllFullQueues,
    ...options,
  });
};

const useCreateQueue = (
  options?: UseMutationOptions<string, Error, QueueFormData>
) => {
  return useMutation({
    mutationFn: (data) =>
      promiseToast(QueueService.createQueue(data), createQueueTexts),
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["queues"]],
      options?.onSuccess
    ),
    ...options,
  });
};

const useRemoveQueuesForTournament = (
  options?: UseMutationOptions<number, Error, number>
) => {
  return useMutation({
    mutationFn: (tournamentId) =>
      QueueService.removeQueuesForTournament(tournamentId),
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["queues"]],
      options?.onSuccess
    ),
    ...options,
  });
};

const useUpdateQueueRideStatus = (
  options?: UseMutationOptions<string, Error, number>
) => {
  return useMutation({
    mutationFn: (queueId) => QueueService.updateQueueRideStatus(queueId),
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["queues"]],
      options?.onSuccess
    ),
    ...options,
  });
};

const useGetAllFullQueuesForTournament = (
  tournamentId: number,
  options?: UseQueryOptions<FullQueueData[], Error>
) => {
  return useQuery({
    queryKey: ["fullQueues", tournamentId],
    queryFn: () => QueueService.getAllFullQueuesForTournament(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useGetFullQueue = (
  queueId: number,
  options?: UseQueryOptions<FullQueueData, Error>
) => {
  return useQuery({
    queryKey: ["fullQueue", queueId],
    queryFn: () => QueueService.getFullQueue(queueId),
    enabled: !!queueId,
    ...options,
  });
};

const useGetFullActiveQueueForTournament = (
  tournamentId: number,
  options?: UseQueryOptions<FullQueueData | null, Error>
) => {
  return useQuery({
    queryKey: ["fullActiveQueue", tournamentId],
    queryFn: () => QueueService.getFullActiveQueueForTournament(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useGetPlayersForQueue = (
  tournamentId: number,
  options?: UseQueryOptions<PlayerData[], Error>
) => {
  return useQuery({
    queryKey: ["playersForQueue", tournamentId],
    queryFn: () => QueueService.playersForQueue(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

const useAddPlayerToQueue = (
  options?: UseMutationOptions<
    boolean,
    Error,
    { tournamentId: number; playerId: number }
  >
) => {
  return useMutation({
    mutationFn: ({ tournamentId, playerId }) =>
      QueueService.addPlayerToQueue(tournamentId, playerId),
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["playersForQueue"]],
      options?.onSuccess
    ),
    ...options,
  });
};

export const QueueQueries = {
  getAllQueues: useGetAllQueues,
  getQueue: useGetQueue,
  getAllFullQueues: useGetAllFullQueues,
  getAllFullQueuesForTournament: useGetAllFullQueuesForTournament,
  getFullQueue: useGetFullQueue,
  getFullActiveQueueForTournament: useGetFullActiveQueueForTournament,
  getPlayersForQueue: useGetPlayersForQueue,
  createQueue: useCreateQueue,
  removeQueuesForTournament: useRemoveQueuesForTournament,
  updateQueueRideStatus: useUpdateQueueRideStatus,
  addPlayerToQueue: useAddPlayerToQueue,
};
