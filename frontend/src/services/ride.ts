import { RideAndPersonData } from "../../types";
import apiClient from "./apiClient";
import { BaseService } from "./baseService";

class RideService extends BaseService {
  static async getTournamentBestRides(
    tournamentId: number
  ): Promise<RideAndPersonData[]> {
    const response = await apiClient.get<RideAndPersonData[]>(
      `/ride/tournament/${tournamentId}/best`
    );
    return response.data;
  }

  static async getTournamentLastRide(
    tournamentId: number
  ): Promise<RideAndPersonData> {
    const response = await apiClient.get<RideAndPersonData>(
      `/ride/tournament/${tournamentId}/last`
    );
    return response.data;
  }

  static async getAllRidesForTournament(
    tournamentId: number
  ): Promise<RideAndPersonData[]> {
    const response = await apiClient.get<RideAndPersonData[]>(
      `/ride/tournament/${tournamentId}`
    );
    return response.data;
  }
}

export default RideService;
