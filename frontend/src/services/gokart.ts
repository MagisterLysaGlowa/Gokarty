import { GokartData, GokartFormData } from "../../types";
import apiClient from "./apiClient";

class GokartService {
  static async createGokart(data: GokartFormData): Promise<GokartData> {
    const response = await apiClient.post<GokartData>("/gokart", data);
    return response.data;
  }

  static async updateGokart(
    gokartId: number,
    data: GokartFormData
  ): Promise<GokartData> {
    const response = await apiClient.put<GokartData>(
      `/gokart/${gokartId}`,
      data
    );
    return response.data;
  }

  static async removeGokart(gokartId: number): Promise<number> {
    const response = await apiClient.delete<string>(`/gokart/${gokartId}`);
    return Number(response.data);
  }

  static async getAllGokarts(): Promise<GokartData[]> {
    const response = await apiClient.get<GokartData[]>("/gokart");
    return response.data;
  }
}

export default GokartService;
