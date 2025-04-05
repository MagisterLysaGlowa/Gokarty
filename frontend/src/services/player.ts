import { PlayerFilterFormData, PlayerData } from "../../types";
import apiClient from "./apiClient";
import { BaseService } from "./baseService";

class PlayerService extends BaseService {
  static async getPlayersForTournament(
    tournamentId: number
  ): Promise<PlayerData[]> {
    const response = await apiClient.get<PlayerData[]>(
      `/player/tournament/${tournamentId}`
    );
    return response.data;
  }

  static async filterPlayers(
    data: PlayerFilterFormData
  ): Promise<PlayerData[]> {
    const response = await apiClient.get<PlayerData[]>(
      `/player/filter?name=${data.name}&surname=${data.surname}&schoolId=${data.schoolId}&tournamentId=${data.tournamentId}`
    );
    return response.data;
  }

  static async addPlayerToTournament(
    tournamentId: number,
    playerId: number
  ): Promise<number> {
    const response = await apiClient.post(
      `/player/addToTournament/${tournamentId}`,
      playerId
    );
    return Number(response.data);
  }

  static async removePlayerFromTournament(
    tournamentId: number,
    playerId: number
  ): Promise<number> {
    const response = await apiClient.post(
      `/player/removeFromTournament/${tournamentId}`,
      playerId
    );
    return Number(response.data);
  }
}

export default PlayerService;
