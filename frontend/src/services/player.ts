import {
  PlayerData,
  PlayerFilterFormData,
  PlayerFormData,
  PlayerWithSchoolData,
} from "../../types";
import apiClient from "./apiClient";

class PlayerService {
  static async createPlayer(
    tournamentId: number,
    data: PlayerFormData
  ): Promise<PlayerData> {
    const response = await apiClient.post<PlayerData>(
      `/player/${tournamentId}`,
      data
    );
    return response.data;
  }

  static async updatePlayer(
    playerId: number,
    data: PlayerFormData
  ): Promise<PlayerData> {
    const response = await apiClient.put<PlayerData>(
      `/player/${playerId}`,
      data
    );
    return response.data;
  }

  static async removePlayer(playerId: number): Promise<number> {
    const response = await apiClient.delete<string>(`/player/${playerId}`);
    return Number(response.data);
  }

  static async getAllPlayers(): Promise<PlayerData[]> {
    const response = await apiClient.get<PlayerData[]>(`/player`);
    return response.data;
  }

  static async getPlayer(playerId: number): Promise<PlayerData> {
    const response = await apiClient.get<PlayerData>(`/player/${playerId}`);
    return response.data;
  }

  static async getPlayerWithSchool(
    playerId: number
  ): Promise<PlayerWithSchoolData> {
    const response = await apiClient.get<PlayerWithSchoolData>(
      `/player/playerWithSchool/${playerId}`
    );
    return response.data;
  }

  static async getPlayersForTournament(
    tournamentId: number
  ): Promise<PlayerData[]> {
    const response = await apiClient.get<PlayerData[]>(
      `/player/forTournament/${tournamentId}`
    );
    return response.data;
  }

  static async getPlayersForTournamentWithSchool(
    tournamentId: number
  ): Promise<PlayerWithSchoolData[]> {
    const response = await apiClient.get<PlayerWithSchoolData[]>(
      `/player/forTournament/withSchool/${tournamentId}`
    );
    return response.data;
  }

  static async filterPlayers(
    data: PlayerFilterFormData
  ): Promise<PlayerWithSchoolData[]> {
    const response = await apiClient.get<PlayerWithSchoolData[]>(
      `/player/filter?name=${data.name}&surname=${data.surname}&schoolId=${data.schoolId}&tournamentId=${data.tournamentId}`
    );
    return response.data;
  }

  static async addPlayerToTournament(
    tournamentId: number,
    playerId: number
  ): Promise<number> {
    const response = await apiClient.post(
      `/player/addplayertotournament/${tournamentId}`,
      playerId
    );
    return Number(response.data);
  }

  static async removePlayerFromTournament(
    tournamentId: number,
    playerId: number
  ): Promise<number> {
    const response = await apiClient.post(
      `/player/removeplayerfromtournament/${tournamentId}`,
      playerId
    );
    return Number(response.data);
  }
}

export default PlayerService;
