import { useMutation, UseMutationOptions } from "react-query";
import { handleError, MutationType } from "./queryUtils";
import { User, UserLogin, UserRegister } from "../../types";
import AuthService from "../services/auth";
import { useAuth } from "../contexts/authContext/useAuth";

const useLoginUser = (options?: UseMutationOptions<User, Error, UserLogin>) => {
  const { login } = useAuth();
  return useMutation({
    ...options,
    mutationFn: async (data) => await AuthService.login(data),
    onError: handleError,
    onSuccess: (res) => login(res),
  });
};

const useRegisterUser = (options?: MutationType<UserRegister>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => await AuthService.register(data),
    onError: handleError,
  });
};

const useLogout = () => {
  const { logout } = useAuth();
  return useMutation({
    mutationFn: AuthService.logout,
    onError: handleError,
    onSuccess: () => logout(),
  });
};

const useIsUserLoggedIn = (options?: UseMutationOptions<User, Error>) => {
  return useMutation({
    ...options,
    mutationFn: AuthService.isUserLoggedIn,
    onError: handleError,
  });
};

export const AuthQuery = {
  login: useLoginUser,
  register: useRegisterUser,
  logout: useLogout,
  isUserLoggedIn: useIsUserLoggedIn,
};
