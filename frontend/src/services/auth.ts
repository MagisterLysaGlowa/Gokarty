import { UserData } from "../../types";
import apiClient from "./apiClient";

class AuthService {
  static async login(login: string, password: string): Promise<string> {
    const response = await apiClient.post<string>("/auth/login", {
      login,
      password,
    });
    return response.data;
  }

  static async logout(): Promise<void> {
    await apiClient.post<string>("/auth/logout");
  }

  static async getUser(): Promise<UserData> {
    const response = await apiClient.get<UserData>("/auth/user");
    return response.data;
  }
}

export default AuthService;
