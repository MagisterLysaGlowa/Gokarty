import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "react-query";
import QueueService from "../services/queue";
import {
  FullQueueData,
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

const useRemoveQueue = (
  options?: UseMutationOptions<number, Error, number>
) => {
  return useMutation({
    mutationFn: (queueId) =>
      QueueService.removeQueue(queueId),
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

export const QueueQueries = {
  getAllQueues: useGetAllQueues,
  getQueue: useGetQueue,
  getAllFullQueues: useGetAllFullQueues,
  getAllFullQueuesForTournament: useGetAllFullQueuesForTournament,
  getFullQueue: useGetFullQueue,
  createQueue: useCreateQueue,
  removeQueue: useRemoveQueue,
};
