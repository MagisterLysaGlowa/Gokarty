import { FullRideData, GokartData, RideData, RideFormData } from "../../types";
import apiClient from "./apiClient";

class RideService {
  static async createRide(data: RideFormData): Promise<RideData> {
    const response = await apiClient.post<RideData>("/ride", data);
    return response.data;
  }

  static async updateRide(
    rideId: number,
    data: RideFormData
  ): Promise<GokartData> {
    const response = await apiClient.put(`/ride/${rideId}`, data);
    return response.data;
  }

  static async removeRide(rideId: number): Promise<number> {
    const response = await apiClient.delete<number>(`/ride/${rideId}`);
    return response.data;
  }

  static async getAllRides(): Promise<RideData[]> {
    const response = await apiClient.get<RideData[]>("/ride");
    return response.data;
  }

  static async getRide(rideId: number): Promise<RideData> {
    const response = await apiClient.get<RideData>(`/ride/${rideId}`);
    return response.data;
  }

  static async getAllFullRides(): Promise<FullRideData[]> {
    const response = await apiClient.get<FullRideData[]>("/ride/full");
    return response.data;
  }

  static async getTournamentBestFullRides(
    tournamentId: number
  ): Promise<FullRideData[]> {
    const response = await apiClient.get<FullRideData[]>(
      `/ride/full/tournament/${tournamentId}`
    );
    return response.data;
  }

  static async getTournamentLastFullRide(
    tournamentId: number
  ): Promise<FullRideData> {
    const response = await apiClient.get<FullRideData>(
      `/ride/full/tournament/${tournamentId}/last`
    );
    return response.data;
  }

  static async getFullRide(rideId: number): Promise<FullRideData> {
    const response = await apiClient.get<FullRideData>(`/ride/full/${rideId}`);
    return response.data;
  }
}

export default RideService;
