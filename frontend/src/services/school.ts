import { SchoolData, SchoolFormData } from "../../types";
import apiClient from "./apiClient";

export const create_school = async (
  data: SchoolFormData
): Promise<SchoolData> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("city", data.city);
  formData.append("acronym", data.acronym);

  const response = await apiClient.post<SchoolData>("/school", formData, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const update_school = async (
  schoolId: number,
  data: SchoolFormData
): Promise<SchoolData> => {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("city", data.city);
  formData.append("acronym", data.acronym);

  const response = await apiClient.put<SchoolData>(
    `/school/${schoolId}`,
    formData,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const remove_school = async (schoolId: number): Promise<number> => {
  const data = await apiClient.delete<string>(`/school/${schoolId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return Number(data.data);
};

export const get_all_schools = async (): Promise<SchoolData[]> => {
  const response = await apiClient.get<SchoolData[]>(`/school`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};

export const get_school = async (schoolId: number): Promise<SchoolData> => {
  const response = await apiClient.get<SchoolData>(`/school/${schoolId}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response.data;
};
