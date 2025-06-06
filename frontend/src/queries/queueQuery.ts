import { useMutation, useQuery, UseQueryOptions } from "react-query";
import QueueService from "../services/queue";
import { QueueData, QueueFormData } from "../../types";
import {
  handleError,
  handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess,
  MutationType,
} from "./queryUtils";
import { successToast } from "../Utils/ToastNotifications";

const useCreateQueue = (options?: MutationType<QueueFormData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      return await QueueService.create(data, "/queue");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess([["queues"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
  });
};

const useRemoveQueue = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (queueId) => await QueueService.remove(queueId, "/queue"),
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess([["queues"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
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
