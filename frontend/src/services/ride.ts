import { FullRideData, RideData, RideFormData } from "../../types";
import apiClient from "./apiClient";

export const create_ride = async (data: RideFormData): Promise<string> => {
  const formData = new FormData();
  formData.append("tournamentId", data.tournamentId.toString());
  formData.append("playerId", data.playerId.toString());
  formData.append("gokartId", data.gokartId.toString());
  formData.append("time", data.time);
  formData.append("rideNumber", data.rideNumber.toString());

  const response = await apiClient.post<string>("/ride", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const update_ride = async (
  rideId: number,
  data: RideFormData
): Promise<string> => {
  const formData = new FormData();
  formData.append("tournamentId", data.tournamentId.toString());
  formData.append("playerId", data.playerId.toString());
  formData.append("gokartId", data.gokartId.toString());
  formData.append("time", data.time);
  formData.append("rideNumber", data.rideNumber.toString());

  const response = await apiClient.put<string>(`/ride/${rideId}`, formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const remove_ride = async (rideId: number): Promise<void> => {
  await apiClient.delete<string>(`/ride/${rideId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const get_all_rides = async (): Promise<RideData[]> => {
  const response = await apiClient.get<RideData[]>(`/ride`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_ride = async (rideId: number): Promise<RideData> => {
  const response = await apiClient.get<RideData>(`/ride/${rideId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_all_full_rides = async (): Promise<FullRideData[]> => {
  const response = await apiClient.get<FullRideData[]>(`/ride/full`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_full_ride = async (rideId: number): Promise<FullRideData> => {
  const response = await apiClient.get<FullRideData>(`/ride/full/${rideId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
