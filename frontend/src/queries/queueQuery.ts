import {
  useMutation,
  useQuery,
  UseMutationOptions,
  UseQueryOptions,
} from "react-query";
import QueueService from "../services/queue";
import {
  QueueData,
  QueueFormData,
} from "../../types";
import { createQueueTexts, promiseToast } from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess } from "./queryUtils";

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
  options?: UseQueryOptions<QueueData[], Error>
) => {
  return useQuery({
    queryKey: ["fullQueues", tournamentId],
    queryFn: () => QueueService.getAllFullQueuesForTournament(tournamentId),
    enabled: !!tournamentId,
    ...options,
  });
};

export const QueueQueries = {
  getAllFullQueuesForTournament: useGetAllFullQueuesForTournament,
  createQueue: useCreateQueue,
  removeQueue: useRemoveQueue,
};
