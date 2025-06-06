import { PlayerFilterFormData, PlayerData } from "../../types";
import apiClient from "./apiClient";
import { BaseService, QueryResponse } from "./baseService";

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
      `/player/filter?${new URLSearchParams(Object.entries(data)).toString()}`
    );
    return response.data;
  }

  static async addPlayerToTournament(
    tournamentId: number,
    playerId: number
  ): Promise<QueryResponse> {
    const response = await apiClient.post(
      `/player/addToTournament/${tournamentId}`,
      playerId
    );
    return response.data;
  }

  static async addPlayersToTournament(
    tournamentId: number,
    playerIds: number[]
  ): Promise<QueryResponse> {
    const response = await apiClient.post(
      `/player/massAddToTournament/${tournamentId}`,
      playerIds
    );
    return response.data;
  }

  static async removePlayerFromTournament(
    tournamentId: number,
    playerId: number
  ): Promise<QueryResponse> {
    const response = await apiClient.post(
      `/player/removeFromTournament/${tournamentId}`,
      playerId
    );
    return response.data;
  }

  static async removePlayersFromTournament(
    tournamentId: number,
    playerIds: number[]
  ): Promise<QueryResponse> {
    const response = await apiClient.post(
      `/player/massRemoveFromTournament/${tournamentId}`,
      playerIds
    );
    return response.data;
  }
}

export default PlayerService;
