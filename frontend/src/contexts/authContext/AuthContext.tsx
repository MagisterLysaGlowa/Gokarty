import { FC, ReactNode, useCallback, useEffect, useState } from "react";
import { AuthContext } from "./useAuth";
import { User } from "../../../types";
import { successToast } from "../../Utils/ToastNotifications";
import { useNavigate } from "react-router-dom";
import { setSessionExpired } from "../../services/apiClient";
import { AuthQuery } from "../../queries/authQuery";

type props = {
  children: ReactNode;
};

export const AuthContextProvider: FC<props> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  const { mutateAsync: isUserLoggedInAsync } = AuthQuery.isUserLoggedIn({
    onSuccess: (res) => {
      setIsLoggedIn(true);
      setUser(res);
    },
  });

  const navigate = useNavigate();

  const login = (user: User) => {
    setIsLoggedIn(true);
    setUser(user);
    successToast("Pomyślnie zalogowano");
    navigate("/");
  };

  const sessionExpired = useCallback(() => {
    setIsLoggedIn(false);
    setUser(undefined);
  }, []);

  const logout = () => {
    setIsLoggedIn(false);
    setUser(undefined);
    successToast("Pomyślnie wylogowano");
    navigate("/");
  };

  useEffect(() => {
    setSessionExpired(sessionExpired);
  }, [sessionExpired]);

  useEffect(() => {
    (async () => {
      if (!isLoggedIn) await isUserLoggedInAsync();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserLoggedInAsync]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
