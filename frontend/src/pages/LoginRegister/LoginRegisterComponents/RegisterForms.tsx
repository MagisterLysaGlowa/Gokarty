import { Input, Button } from "@heroui/react";
import { UserRegister } from "../../../../types";
import { Dispatch, FC, useState } from "react";
import { UserQuery } from "../../../queries/userQuery";
type Props = {
  setIsLogin: Dispatch<React.SetStateAction<boolean>>;
};

export const RegisterForms: FC<Props> = ({ setIsLogin }) => {
  const [register, setRegister] = useState<UserRegister>({
    Login: "",
    Email: "",
    Password: "",
    PasswordRepeat: "",
  });
  const { mutateAsync: registerAsync } = UserQuery.register({
    onSuccess: () => setIsLogin(true),
  });

  return (
    <>
      <Input
        value={register.Login}
        label="Login"
        size="sm"
        onValueChange={(e) => setRegister((p) => ({ ...p, Login: e }))}
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
      <Input
        value={register.Email}
        label="Email"
        type="email"
        size="sm"
        onValueChange={(e) => setRegister((p) => ({ ...p, Email: e }))}
      />
      <Button
        color="primary"
        onPress={async () => await registerAsync(register)}
      >
        Zarejestruj
      </Button>
      <span onClick={() => setIsLogin(true)}>Logowanie</span>
    </>
  );
};
