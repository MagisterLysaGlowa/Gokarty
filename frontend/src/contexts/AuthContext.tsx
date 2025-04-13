import { createContext, FC, useState } from "react";
import { useQuery } from "react-query";
import { UserQuery } from "../queries/userQuery";
import { errorToast, successToast } from "../Utils/ToastNotifications";

interface AuthContextType {
  children: React.ReactNode;
}

interface AuthProps {
  login: (action?: () => void) => void;
  logout: (action?: () => void) => void;
}

const authContext = createContext<AuthProps | undefined>(undefined);

export const AuthProvider: FC<AuthContextType> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = (action?: () => void) => {
    setIsLoggedIn(true);
    if (action) action();
  };

  const logout = (action?: () => void) => {
    setIsLoggedIn(false);
    if (action) action();
  };

  UserQuery.refreshToken({
    onSuccess: () => {
      successToast("Odswiezono tokena");
      login();
    },
    onError: () => {
      errorToast("Nie odswiezono tokena");
      logout();
    },
  });

  return (
    <authContext.Provider value={{ login, logout }}>
      {children}
    </authContext.Provider>
  );
};
