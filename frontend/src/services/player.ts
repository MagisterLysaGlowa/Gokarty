import {
  PlayerData,
  PlayerFilterFormData,
  PlayerFormData,
  PlayerWithSchoolData,
} from "../../types";
import apiClient from "./apiClient";

export const create_player = async (
  tournamentId: number,
  data: PlayerFormData
): Promise<string> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("birthDate", data.birthDate.toJSON());
  formData.append("schoolId", data.schoolId.toString());

  const response = await apiClient.post<string>(
    `/player/${tournamentId}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const update_player = async (
  playerId: number,
  data: PlayerFormData
): Promise<string> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("birthDate", data.birthDate.toJSON());
  formData.append("schoolId", data.schoolId.toString());

  const response = await apiClient.put<string>(
    `/player/${playerId}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const remove_player = async (playerId: number): Promise<void> => {
  await apiClient.delete<string>(`/player/${playerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const get_all_players = async (): Promise<PlayerData[]> => {
  const response = await apiClient.get<PlayerData[]>(`/player`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_player = async (playerId: number): Promise<PlayerData> => {
  const response = await apiClient.get<PlayerData>(`/player/${playerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_player_with_school = async (
  playerId: number
): Promise<PlayerWithSchoolData> => {
  const response = await apiClient.get<PlayerWithSchoolData>(
    `/player/playerWithSchool/${playerId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const get_players_for_tournament = async (
  tournamentId: number
): Promise<PlayerData[]> => {
  const response = await apiClient.get<PlayerData[]>(
    `/player/forTournament/${tournamentId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const filter_players = async (
  data: PlayerFilterFormData
): Promise<PlayerData[]> => {
  const response = await apiClient.get<PlayerData[]>(
    `/player/filter?name=${data.name}&surname=${data.surname}&schoolId=${data.schoolId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};
