import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { BiLogIn, BiLogOut } from "react-icons/bi";
import { FcManager } from "react-icons/fc";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/useAuth";
import { AuthQuery } from "../../queries/authQuery";

export const LoginButton = () => {
  const navigate = useNavigate();
  const { user, isLoggedIn } = useAuth();
  const { mutateAsync: logoutAsync } = AuthQuery.logout();

  return isLoggedIn && user ? (
    <Dropdown>
      <DropdownTrigger>
        <Button
          variant="bordered"
          className="text-center text-xl flex align-middle my-auto hover:text-zinc-300"
        >
          Konto
        </Button>
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="manage"
          className="text-center text-xl flex align-middle my-auto hover:text-zinc-300"
          endContent={<FcManager className="text-2xl" />}
        >
          Zarządzaj
        </DropdownItem>
        <DropdownItem
          className="text-center text-xl flex align-middle my-auto hover:text-zinc-300"
          endContent={<BiLogOut className="text-2xl" />}
          onPress={async () => await logoutAsync()}
          key="copy"
        >
          Wyloguj
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  ) : (
    <Button
      className="text-center text-xl flex align-middle my-auto hover:text-zinc-300"
      onPress={() => navigate("/logowanie")}
      endContent={<BiLogIn className="text-2xl" />}
    >
      Zaloguj się
    </Button>
  );
};
