import {
  FullQueueData,
  FullRideData,
  QueueData,
  QueueFormData,
  RideData,
  RideFormData,
} from "../../types";
import apiClient from "./apiClient";

export const create_queue = async (data: QueueFormData): Promise<string> => {
  const formData = new FormData();
  formData.append("tournamentId", data.tournamentId.toString());
  formData.append("playerId", data.playerId.toString());
  formData.append("queuePosition", data.queuePosition.toString());
  formData.append("rideStatusId", data.rideStatusId.toString());

  const response = await apiClient.post<string>("/queue", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const update_queue = async (
  queueId: number,
  data: QueueFormData
): Promise<string> => {
  const formData = new FormData();
  formData.append("tournamentId", data.tournamentId.toString());
  formData.append("playerId", data.playerId.toString());
  formData.append("queuePosition", data.queuePosition.toString());
  formData.append("rideStatusId", data.rideStatusId.toString());

  const response = await apiClient.put<string>(`/queue/${queueId}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const remove_queue = async (queueId: number): Promise<void> => {
  await apiClient.delete<string>(`/queue/${queueId}`, {
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
