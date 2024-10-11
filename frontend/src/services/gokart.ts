import { GokartData, GokartFormData } from "../../types";
import apiClient from "./apiClient";

export const create_gokart = async (
  data: GokartFormData
): Promise<GokartData> => {
  const formData = new FormData();
  formData.append("name", data.name);

  const response = await apiClient.post<GokartData>("/gokart", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const update_gokart = async (
  gokartId: number,
  data: GokartFormData
): Promise<GokartData> => {
  const formData = new FormData();
  formData.append("name", data.name);

  const response = await apiClient.put<GokartData>(
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

export const remove_gokart = async (gokartId: number): Promise<number> => {
  const data = await apiClient.delete<string>(`/gokart/${gokartId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return Number(data.data);
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
