import { useMutation } from "react-query";
import { handleError, MutationType } from "./queryUtils";
import { UserLogin, UserRegister } from "../../types";
import AuthService from "../services/auth";
import { successToast } from "../Utils/ToastNotifications";

const useLoginUser = (options?: MutationType<UserLogin>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => await AuthService.login(data),
    onError: handleError,
    onSuccess: () => {
      successToast("Zalogowano");
    },
  });
};

const useRegisterUser = (options?: MutationType<UserRegister>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => await AuthService.register(data),
    onError: handleError,
    onSuccess: () => {
      successToast("Zarejestrowano");
    },
  });
};

const useLogout = () => {
  return useMutation({
    mutationFn: AuthService.logout,
    onError: handleError,
    onSuccess: () => {
      successToast("Wylogowano");
    },
  });
};

export const UserQuery = {
  login: useLoginUser,
  register: useRegisterUser,
  logout: useLogout,
};
