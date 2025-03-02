import { SchoolData, SchoolFormData } from "../../types";
import apiClient from "./apiClient";

class SchoolService {
  static async createSchool(data: SchoolFormData): Promise<SchoolData> {
    return (await apiClient.post<SchoolData>("/school", data)).data;
  }

  static async updateSchool(
    schoolId: number,
    data: SchoolFormData
  ): Promise<SchoolData> {
    return (await apiClient.put<SchoolData>(`/school/${schoolId}`, data)).data;
  }

  static async removeSchool(schoolId: number): Promise<number> {
    return Number((await apiClient.delete<string>(`/school/${schoolId}`)).data);
  }

  static async getAllSchools(): Promise<SchoolData[]> {
    return (await apiClient.get<SchoolData[]>("/school")).data;
  }

  static async getSchool(schoolId: number): Promise<SchoolData> {
    return (await apiClient.get<SchoolData>(`/school/${schoolId}`)).data;
  }
}

export default SchoolService;
