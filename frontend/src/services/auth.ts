import { UserLogin, UserRegister } from "../../types";
import apiClient from "./apiClient";

export class AuthService {
  static async login(data: UserLogin) {
    const response = await apiClient.post("/user/login", data);
    return response.data;
  }

  static async register(data: UserRegister) {
    const response = await apiClient.post("/user/register", data);
    return response.data;
  }

  static async logout() {
    const response = await apiClient.post("/user/logout");
    return response.data;
  }

  static async refreshToken() {
    const response = await apiClient.post("/user/refreshtoken");
    return response.data;
  }
}
export default AuthService;
