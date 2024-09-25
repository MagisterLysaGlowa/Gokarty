import { UserData } from "../../types";
import apiClient from "./apiClient";

export const login = async (
  login: string,
  password: string
): Promise<string> => {
  const formData = new FormData();
  formData.append("login", login);
  formData.append("password", password);
  console.log(login + password);

  const response = await apiClient.post<string>("/auth/login", formData, {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
  return response.data;
};

export const logout = async (): Promise<void> => {
  await apiClient.post<string>("/auth/logout", {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });
};

export const getUser = async (): Promise<UserData> => {
  const response = await apiClient.get<UserData>("/auth/user", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response.data);
  return response.data;
};
