import {
  FullQueueData,
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

  static async removeQueue(
    queueId: number
  ): Promise<number> {
    const response = await apiClient.delete<number>(`/queue/${queueId}`);
    return response.data;
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
}

export default QueueService;
