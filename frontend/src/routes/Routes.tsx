import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Tournaments from "../pages/Tournaments/Tournaments";
import TournamentEdit from "../pages/TournamentEdit/TournamentEdit";
import TournamentTable from "../pages/tournamentTable/TournamentTable";
import { SchoolManagement } from "../pages/SchoolManagemet/SchoolManagement";
import { AddPlayer } from "../pages/AddPlayer/AddPlayer";
import { AddGokart } from "../pages/AddGokart/AddGokart";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "zawody", element: <Tournaments /> },
      { path: "gokart", element: <AddGokart /> },
      { path: "zawody/wyniki/:id", element: <TournamentTable /> },
      { path: "zawody/edycja/:id", element: <TournamentEdit /> },
      { path: "szkoly", element: <SchoolManagement /> },
      { path: "zawody/edycja/:id/zawodnik", element: <AddPlayer /> },
      { path: "zawody/edycja/:id/zawodnik/:playerId", element: <AddPlayer /> },
    ],
  },
]);
