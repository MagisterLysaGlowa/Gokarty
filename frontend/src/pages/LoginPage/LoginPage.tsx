import { useState } from "react";
import { LoginFormData } from "../../../types";
import { getUser, login, logout } from "../../services/auth";

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
      const data = await login(loginFormData.login, loginFormData.password);
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

  return (
    <div>
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
