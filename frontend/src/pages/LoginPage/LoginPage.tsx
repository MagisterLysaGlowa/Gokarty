import { useState } from "react";
import { LoginFormData, PlayerFormData } from "../../../types";
import { getUser, login, logout } from "../../services/auth";
import {
  create_player,
  get_all_players,
  get_player,
  get_player_with_school,
  get_players_for_tournament,
  remove_player,
  update_player,
} from "../../services/player";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    login: "",
    password: "",
  });

  const [error, setError] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setLoginFormData({
      ...loginFormData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(loginFormData.login, loginFormData.password);
      console.log("logged correctly");
    } catch (err) {
      setError("Login failed!");
      console.log("logged failed");
    }
  };

  const handleLogout = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await logout();
      console.log("logout correctly");
    } catch (err) {
      console.log("logout failed");
    }
  };

  const handleGetUser = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await getUser();
    } catch (err) {
      console.log("getting user failed");
    }
  };

  const testClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const player: PlayerFormData = {
        name: "kacper",
        surname: "eser",
        birthDate: new Date(),
        schoolId: 1,
      };
      console.log(await get_players_for_tournament(6));
    } catch (err) {
      console.log("getting user failed");
    }
  };

  return (
    <div>
      <button onClick={testClick}>Dodaj testowy</button>
      <button onClick={handleLogout}>Logout</button>
      <button onClick={handleGetUser}>Get user info</button>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
      >
        <label>Login</label>
        <input
          type="text"
          placeholder="Login"
          onChange={handleChange}
          name="login"
        />
        <label>Hasło</label>
        <input
          type="text"
          placeholder="Hasło"
          onChange={handleChange}
          name="password"
        />
        <button>Zaloguj się</button>
      </form>
    </div>
  );
};

export default LoginPage;
