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
): Promise<PlayerData> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("birthDate", data.birthDate.toJSON());
  formData.append("schoolId", data.schoolId.toString());

  const response = await apiClient.post<PlayerData>(
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
): Promise<PlayerData> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("surname", data.surname);
  formData.append("birthDate", data.birthDate.toJSON());
  formData.append("schoolId", data.schoolId.toString());

  const response = await apiClient.put<PlayerData>(
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

export const remove_player = async (playerId: number): Promise<number> => {
  const data = await apiClient.delete<string>(`/player/${playerId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return Number(data.data);
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

export const get_players_for_tournament_with_school = async (
  tournamentId: number
): Promise<PlayerWithSchoolData[]> => {
  const response = await apiClient.get<PlayerWithSchoolData[]>(
    `/player/forTournament/withSchool/${tournamentId}`,
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
): Promise<PlayerWithSchoolData[]> => {
  const response = await apiClient.get<PlayerWithSchoolData[]>(
    `/player/filter?name=${data.name}&surname=${data.surname}&schoolId=${data.schoolId}&tournamentId=${data.tournamentId}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const add_player_to_tournament = async (
  tournamentId: number,
  playerId: number
): Promise<number> => {
  const data = await apiClient.post(
    `/player/addplayertotournament/${tournamentId}`,
    playerId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return Number(data.data);
};

export const remove_player_to_tournament = async (
  tournamentId: number,
  playerId: number
): Promise<number> => {
  const data = await apiClient.post(
    `/player/removeplayerfromtournament/${tournamentId}`,
    playerId,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return Number(data.data);
};
