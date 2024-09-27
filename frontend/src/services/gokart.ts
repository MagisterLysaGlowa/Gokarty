import { GokartData, GokartFormData } from "../../types";
import apiClient from "./apiClient";

export const create_gokart = async (data: GokartFormData): Promise<string> => {
  const formData = new FormData();
  formData.append("name", data.name);

  const response = await apiClient.post<string>("/gokart", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const update_gokart = async (
  gokartId: number,
  data: GokartFormData
): Promise<string> => {
  const formData = new FormData();
  formData.append("name", data.name);

  const response = await apiClient.put<string>(
    `/gokart/${gokartId}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const remove_gokart = async (gokartId: number): Promise<void> => {
  await apiClient.delete<string>(`/gokart/${gokartId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const get_all_gokarts = async (): Promise<GokartData[]> => {
  const response = await apiClient.get<GokartData[]>(`/gokart`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_gokart = async (gokartId: number): Promise<GokartData> => {
  const response = await apiClient.get<GokartData>(`/gokart/${gokartId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
