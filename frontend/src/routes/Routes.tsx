import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Tournaments from "../pages/Tournaments/Tournaments";
import TournamentEdit from "../pages/TournamentEdit/TournamentEdit";
import TournamentTable from "../pages/tournamentTable/TournamentTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "zawody", element: <Tournaments /> },
      { path: "zawody/wyniki", element: <TournamentTable /> },
      { path: "zawody/edycja", element: <TournamentEdit /> },
    ],
  },
]);
