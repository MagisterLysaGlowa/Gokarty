import { UserLogin, UserRegister } from "../../types";
import apiClient from "./apiClient";

export class AuthService {
  static async login(data: UserLogin) {
    const response = await apiClient.post(
      "/login?useCookies=true&useSessionCookies=true",
      data
    );
    return response.data;
  }

  static async register(data: UserRegister) {
    const response = await apiClient.post("/register", data);
    return response.data;
  }

  static async logout() {
    const response = await apiClient.post("/logout");
    return response.data;
  }
}
export default AuthService;
