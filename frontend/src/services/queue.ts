import { QueueData } from "../../types";
import apiClient from "./apiClient";
import { BaseService } from "./baseService";

class QueueService extends BaseService {
  static async getAllFullQueuesForTournament(
    tournamentId: number
  ): Promise<QueueData[]> {
    return (
      await apiClient.get<QueueData[]>(`/queue/tournament/${tournamentId}`)
    ).data;
  }
}

export default QueueService;
