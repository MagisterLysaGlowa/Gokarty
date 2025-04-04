import {
  PlayerFilterFormData,
  PlayerFormData,
  PlayerData,
} from "../../types";
import apiClient from "./apiClient";

class PlayerService {
  static async createPlayer(
    data: PlayerFormData
  ): Promise<PlayerFormData> {
    const response = await apiClient.post<PlayerData>(
      `/player`,
      data
    );
    return response.data;
  }

  static async updatePlayer(
    data: PlayerData
  ): Promise<PlayerFormData> {
    const response = await apiClient.put<PlayerData>(
      `/player`,
      data
    );
    return response.data;
  }

  static async removePlayer(playerId: number): Promise<number> {
    const response = await apiClient.delete<string>(`/player/${playerId}`);
    return Number(response.data);
  }

  static async getPlayer(playerId: number): Promise<PlayerData> {
    const response = await apiClient.get<PlayerData>(`/player/${playerId}`);
    return response.data;
  }

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
