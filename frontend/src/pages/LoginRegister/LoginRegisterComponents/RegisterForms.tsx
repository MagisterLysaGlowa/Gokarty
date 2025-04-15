import { Input, Button } from "@heroui/react";
import { UserRegister } from "../../../../types";
import { Dispatch, FC, useState } from "react";
import { UserQuery } from "../../../queries/userQuery";
type Props = {
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterForms: FC<Props> = ({ setIsLogin }) => {
  const [register, setRegister] = useState<UserRegister>({
    UserName: "",
    Email: "",
    Password: "",
    PasswordRepeat: "",
  });
  const { mutateAsync: registerAsync, isLoading } = UserQuery.register({
    onSuccess: () => setIsLogin(true),
  });

  return (
    <>
      <Input
        value={register.Email}
        label="Email"
        type="email"
        size="sm"
        onValueChange={(e) => setRegister((p) => ({ ...p, Email: e }))}
      />
      <Input
        value={register.UserName}
        label="Nazwa użytkownika"
        size="sm"
        onValueChange={(e) => setRegister((p) => ({ ...p, UserName: e }))}
      />
      <Input
        value={register.Password}
        label="Hasło"
        type="password"
        size="sm"
        onValueChange={(e) => setRegister((p) => ({ ...p, Password: e }))}
      />
      <Input
        value={register.PasswordRepeat}
        label="Powtórz hasło"
        type="password"
        size="sm"
        onValueChange={(e) => setRegister((p) => ({ ...p, PasswordRepeat: e }))}
      />
      <Button
        isLoading={isLoading}
        color="primary"
        onPress={async () => await registerAsync(register)}
      >
        Zarejestruj
      </Button>
      <span className="text-center">
        Posiadasz konto? Zaloguj się tutaj{" "}
        <span
          className="hover:cursor-pointer text-main-default underline mx-auto"
          onClick={() => setIsLogin(true)}
        >
          tutaj
        </span>
      </span>
    </>
  );
};
