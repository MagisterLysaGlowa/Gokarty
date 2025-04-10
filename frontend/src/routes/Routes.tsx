import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Tournaments from "../pages/Tournaments/Tournaments";
import TournamentTable from "../pages/TournamentTable/TournamentTable";
import { SchoolManagement } from "../pages/SchoolManagement/SchoolManagement";
import { AddGokart } from "../pages/GokartManagement/GokartManagement";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { MainNavigationLayout } from "../layouts/MainNavigationLayout";
import { DualNavigationManagment } from "../layouts/DualNavigationManagment";
import { TournamentRides } from "../pages/TournamentManagement/SubPages/tournamentRides/TournamentRides";
import { TournamentInfo } from "../pages/TournamentManagement/SubPages/tournamentInfo/TournamentInfo";
import { AddPlayerForTournament } from "../pages/TournamentManagement/SubPages/addPlayerForTournament/AddPlayerForTournament";
import { PlayersForTournament } from "../pages/TournamentManagement/SubPages/playersForTournament/PlayersForTournament";
import { InfoPage } from "../pages/InfoPage/InfoPage";
import { GokartsPage } from "../pages/GokartsPage/GokartsPage";
import { QueueManagement } from "../pages/QueueManagement/QueueManagement";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <EmptyLayout />,
        children: [
          { path: "", element: <HomePage /> },
          { path: "login", element: <LoginPage /> },
          { path: "register", element: <RegisterPage /> },
          { path: "zawody/:id/wyniki", element: <TournamentTable /> },
          { path: "informacje", element: <InfoPage /> },
          { path: "gokarty", element: <GokartsPage /> },
        ],
      },
      {
        path: "/",
        element: <MainNavigationLayout />,
        children: [
          { path: "zawody", element: <Tournaments /> },
          { path: "gokart", element: <AddGokart /> },
          { path: "szkoly", element: <SchoolManagement /> },
        ],
      },
      {
        path: "zawody",
        element: <DualNavigationManagment />,
        children: [
          { path: ":id/:tournamentName", element: <TournamentInfo /> },
          { path: ":id/:tournamentName/przejazdy", element: <TournamentRides /> },
          { path: ":id/:tournamentName/zawodnicy", element: <PlayersForTournament /> },
          { path: ":id/:tournamentName/dodaj zawodnikow", element: <AddPlayerForTournament /> },
          { path: ":id/:tournamentName/kolejka", element: <QueueManagement /> }
        ],
      },
    ],
  },
]);
