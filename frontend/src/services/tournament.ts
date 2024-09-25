import { TournamentFormData } from "../../types";
import apiClient from "./apiClient";

export const create = async (data: TournamentFormData): Promise<string> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("startDate", data.startDate.toString());
  formData.append("endDate", data.endDate.toString());
  formData.append("tournamentStateId", data.tournamentStateId.toString());

  const response = await apiClient.post<string>("/tournament", formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};
