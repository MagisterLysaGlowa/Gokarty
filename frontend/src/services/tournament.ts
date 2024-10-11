import { TournamentData, TournamentFormData } from "../../types";
import apiClient from "./apiClient";

export const create_tournament = async (
  data: TournamentFormData
): Promise<TournamentData> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("startDate", data.startDate.toJSON());
  formData.append("endDate", data.endDate.toJSON());
  formData.append("tournamentStateId", data.tournamentStateId.toString());
  console.log(formData);

  const response = await apiClient.post<TournamentData>(
    "/tournament",
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const update_tournament = async (
  tournamentId: number,
  data: TournamentFormData
): Promise<TournamentData> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("startDate", data.startDate.toJSON());
  formData.append("endDate", data.endDate.toJSON());
  formData.append("tournamentStateId", data.tournamentStateId.toString());
  console.log(formData);

  const response = await apiClient.put<TournamentData>(
    `/tournament/${tournamentId}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const remove_tournament = async (
  tournamentId: number
): Promise<void> => {
  await apiClient.delete<string>(`/tournament/${tournamentId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const get_all_tournaments = async (): Promise<TournamentData[]> => {
  const response = await apiClient.get<TournamentData[]>(`/tournament`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_tournament = async (
  tournamentId: number
): Promise<TournamentData> => {
  const response = await apiClient.get<TournamentData>(
    `/tournament/${tournamentId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
