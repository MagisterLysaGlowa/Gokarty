import apiClient from "./apiClient";

export class BaseService {
  static async create<T>(data: T | FormData, endpoint: string): Promise<QueryResponse> {
    const response = await apiClient.post<QueryResponse>(endpoint, data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return response.data;
  }

  static async update<T>(data: T | FormData, endpoint: string): Promise<QueryResponse> {
    const response = await apiClient.put<QueryResponse>(endpoint, data, {
      headers: data instanceof FormData ? { "Content-Type": "multipart/form-data" } : undefined,
    });
    return response.data;
  }

  static async remove(id: number, endpoint: string): Promise<QueryResponse> {
    const response = await apiClient.delete<QueryResponse>(`${endpoint}/${id}`);
    return response.data;
  }

  static async getAll<T>(endpoint: string): Promise<T[]> {
    const response = await apiClient.get<T[]>(endpoint);
    return response.data;
  }

  static async get<T>(id: number, endpoint: string): Promise<T> {
    const response = await apiClient.get<T>(`${endpoint}/${id}`);
    return response.data;
  }

  static async massRemove(ids: number[], endpoint: string): Promise<QueryResponse> {
    const response = await apiClient.delete<QueryResponse>(endpoint, {data: ids});
    return response.data;
  }
}
export interface QueryResponse {
  status: number;
  statusText: string;
  message: string;
}
