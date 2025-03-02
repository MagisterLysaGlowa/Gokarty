import {
  FullQueueData,
  PlayerData,
  QueueData,
  QueueFormData,
} from "../../types";
import apiClient from "./apiClient";

class QueueService {
  static async createQueue(data: QueueFormData): Promise<string> {
    const formData = new FormData();
    formData.append("tournamentId", data.tournamentId.toString());
    data.gokartIds.forEach((id, index) => {
      formData.append(`gokartIds[${index}]`, id.toString());
    });
    formData.append(
      "numberOfRidesInOneGokart",
      data.numberOfRidesInOneGokart.toString()
    );

    return (await apiClient.post<string>("/queue", formData)).data;
  }

  static async removeQueuesForTournament(
    tournamentId: number
  ): Promise<number> {
    const response = await apiClient.delete<number>(`/queue/${tournamentId}`);
    return response.data;
  }

  static async getAllQueues(): Promise<QueueData[]> {
    return (await apiClient.get<QueueData[]>("/queue")).data;
  }

  static async getQueue(queueId: number): Promise<QueueData> {
    return (await apiClient.get<QueueData>(`/queue/${queueId}`)).data;
  }

  static async getAllFullQueues(): Promise<FullQueueData[]> {
    return (await apiClient.get<FullQueueData[]>("/queue/full")).data;
  }

  static async getAllFullQueuesForTournament(
    tournamentId: number
  ): Promise<FullQueueData[]> {
    return (
      await apiClient.get<FullQueueData[]>(
        `/queue/full/tournament/${tournamentId}`
      )
    ).data;
  }

  static async getFullQueue(queueId: number): Promise<FullQueueData> {
    return (await apiClient.get<FullQueueData>(`/queue/full/${queueId}`)).data;
  }

  static async getFullActiveQueueForTournament(
    tournamentId: number
  ): Promise<FullQueueData | null> {
    const response = await apiClient.get(
      `/queue/full/tournament/${tournamentId}/active`
    );
    return response.data;
  }

  static async updateQueueRideStatus(queueId: number): Promise<string> {
    return (await apiClient.put<string>(`/queue/${queueId}`, new FormData()))
      .data;
  }

  static async playersForQueue(tournamentId: number): Promise<PlayerData[]> {
    return (
      await apiClient.get<PlayerData[]>(
        `/queue/tournament/${tournamentId}/players`
      )
    ).data;
  }

  static async addPlayerToQueue(
    tournamentId: number,
    playerId: number
  ): Promise<boolean> {
    return (
      await apiClient.post<boolean>(
        `/queue/tournament/${tournamentId}/player/${playerId}`
      )
    ).data;
  }
}

export default QueueService;
