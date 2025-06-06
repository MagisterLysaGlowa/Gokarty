import { User, UserLogin, UserRegister } from "../../types";
import apiClient from "./apiClient";

export class AuthService {
  static async login(data: UserLogin): Promise<User> {
    const response = await apiClient.post("/auth/login", data);
    return response.data;
  }

  static async register(data: UserRegister) {
    const response = await apiClient.post("/auth/register", data);
    return response.data;
  }

  static async logout() {
    const response = await apiClient.post("/auth/logout");
    return response.data;
  }

  static async isUserLoggedIn(): Promise<User> {
    const response = await apiClient.post("/auth/isUserLoggedin");
    return response.data;
  }
}
export default AuthService;
