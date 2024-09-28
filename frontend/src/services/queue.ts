import {
  FullQueueData,
  QueueData,
  QueueFormData,
} from "../../types";
import apiClient from "./apiClient";

export const create_queue = async (data: QueueFormData): Promise<string> => {
  const formData = new FormData();
  formData.append("tournamentId", data.tournamentId.toString());
  data.gokartIds.forEach((id, index) => {
    formData.append(`gokartIds[${index}]`, id.toString());
  });
  formData.append("numberOfRidesInOneGokart", data.numberOfRidesInOneGokart.toString());

  const response = await apiClient.post<string>("/queue", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const remove_queues_for_tournament = async (tournamentId: number): Promise<void> => {
  await apiClient.delete<string>(`/queue/${tournamentId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const get_all_queues = async (): Promise<QueueData[]> => {
  const response = await apiClient.get<QueueData[]>(`/queue`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_queue = async (queueId: number): Promise<QueueData> => {
  const response = await apiClient.get<QueueData>(`/queue/${queueId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_all_full_queues = async (): Promise<FullQueueData[]> => {
  const response = await apiClient.get<FullQueueData[]>(`/queue/full`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_all_full_queues_for_tournament = async (tournamentId: number): Promise<FullQueueData[]> => {
  const response = await apiClient.get<FullQueueData[]>(`/queue/full/tournament${tournamentId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_full_queue = async (
  queueId: number
): Promise<FullQueueData> => {
  const response = await apiClient.get<FullQueueData>(
    `/queue/full/${queueId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const get_full_active_queue_for_tournament = async (
  tournamentId: number
): Promise<FullQueueData> => {
  const response = await apiClient.get<FullQueueData>(
    `/queue/full/tournament/${tournamentId}/active`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const update_queue_ride_status = async (
  queueId: number,
): Promise<string> => {
  const formData = new FormData();
  const response = await apiClient.put<string>(`/ride/${queueId}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
