import { createContext, useContext } from "react";
import { User } from "../../../types";

export type AuthContextProps = {
  isLoggedIn: boolean;
  user: User | undefined;
  login: (user: User) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Dupa");
  return context;
};
