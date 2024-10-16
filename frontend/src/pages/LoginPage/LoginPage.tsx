import { useEffect, useState } from "react";
import {
  LoginFormData,
  PlayerFilterFormData,
  PlayerFormData,
  SchoolFormData,
} from "../../../types";
import { getUser, login, logout } from "../../services/auth";
import {
  create_player,
  filter_players,
  get_all_players,
  get_player,
  get_player_with_school,
  get_players_for_tournament,
  remove_player,
  update_player,
} from "../../services/player";
import {
  create_school,
  get_all_schools,
  get_school,
  remove_school,
  update_school,
} from "../../services/school";
import { get_all_full_rides, get_full_ride } from "../../services/ride";
import { get_full_queue } from "../../services/queue";

const LoginPage = () => {
  const [loginFormData, setLoginFormData] = useState<LoginFormData>({
    login: "",
    password: "",
  });

  useEffect(() => {
    console.log(get_full_queue(1));
  }, []);

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
      const filter: PlayerFilterFormData = {
        name: "r",
        surname: "",
        schoolId: 1,
      };
      console.log(await filter_players(filter));
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
