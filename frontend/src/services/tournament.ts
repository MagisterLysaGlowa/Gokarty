import { TournamentData, TournamentFormData } from "../../types";
import apiClient from "./apiClient";

class TournamentService {
  // Tworzenie turnieju
  static async createTournament(
    data: TournamentFormData
  ): Promise<TournamentData> {
    const response = await apiClient.post<TournamentData>("/tournament", data);
    return response.data;
  }

  // Aktualizacja turnieju
  static async updateTournament(
    tournamentId: number,
    data: TournamentFormData
  ): Promise<TournamentData> {
    console.log(data);
    
    const response = await apiClient.put<TournamentData>(
      `/tournament/${tournamentId}`,
      data
    );
    return response.data;
  }

  // Usuwanie turnieju
  static async removeTournament(tournamentId: number): Promise<number> {
    const data = await apiClient.delete(`/tournament/${tournamentId}`);
    return data.data;
  }

  // Pobieranie wszystkich turniejów
  static async getAllTournaments(): Promise<TournamentData[]> {
    const response = await apiClient.get<TournamentData[]>(`/tournament`);
    return response.data;
  }

  // Pobieranie pojedynczego turnieju
  static async getTournament(tournamentId: number): Promise<TournamentData> {
    const response = await apiClient.get<TournamentData>(
      `/tournament/${tournamentId}`
    );
    return response.data;
  }
}

export default TournamentService;
