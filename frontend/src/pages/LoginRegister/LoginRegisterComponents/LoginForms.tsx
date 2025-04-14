import { Input, Button } from "@heroui/react";
import { Dispatch, FC, useState } from "react";
import { UserLogin } from "../../../../types";
import { UserQuery } from "../../../queries/userQuery";
import { useNavigate } from "react-router-dom";

type Props = {
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForms: FC<Props> = ({ setIsLogin }) => {
  const [login, setLogin] = useState<UserLogin>({
    LoginOrEmail: "",
    Password: "",
  });
  const navigate = useNavigate();
  const { mutateAsync: loginAsync, isLoading } = UserQuery.login({
    onSuccess: () => navigate("/"),
  });

  return (
    <>
      <Input
        value={login.LoginOrEmail}
        label="Login lub Email"
        size="sm"
        onValueChange={(e) => setLogin((p) => ({ ...p, LoginOrEmail: e }))}
      />
      <Input
        value={login.Password}
        label="Hasło"
        type="password"
        size="sm"
        onValueChange={(e) => setLogin((p) => ({ ...p, Password: e }))}
      />
      <Button
        isLoading={isLoading}
        color="primary"
        onPress={async () => await loginAsync(login)}
      >
        Zaloguj
      </Button>
      <span onClick={() => setIsLogin(false)}>Rejestracja</span>
    </>
  );
};
