import { Input, Button } from "@heroui/react";
import { Dispatch, FC, useState } from "react";
import { UserLogin } from "../../../../types";
import { AuthQuery } from "../../../queries/authQuery";

type Props = {
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
};

export const LoginForms: FC<Props> = ({ setIsLogin }) => {
  const [data, setData] = useState<UserLogin>({
    LoginOrEmail: "",
    Password: "",
  });
  const { mutateAsync: loginAsync, isLoading } = AuthQuery.login();

  return (
    <>
      <Input
        value={data.LoginOrEmail}
        label="Email"
        size="sm"
        onValueChange={(e) => setData((p) => ({ ...p, LoginOrEmail: e }))}
      />
      <Input
        value={data.Password}
        label="Hasło"
        type="password"
        size="sm"
        onValueChange={(e) => setData((p) => ({ ...p, Password: e }))}
      />
      <Button
        isLoading={isLoading}
        className="bg-main-default disabled:cursor-not-allowed disabled:bg-zinc-800"
        onPress={async () => await loginAsync(data)}
      >
        Zaloguj
      </Button>
      <span className="mx-auto">
        Nie masz konta? Zarejestruj się
        <span
          className="hover:cursor-pointer text-main-default underline"
          onClick={() => setIsLogin(false)}
        >
          tutaj
        </span>
      </span>
    </>
  );
};
