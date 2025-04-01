import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/HomePage/HomePage";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import Tournaments from "../pages/Tournaments/Tournaments";
import TournamentTable from "../pages/TournamentTable/TournamentTable";
import { SchoolManagement } from "../pages/SchoolManagemet/SchoolManagement";
import { AddGokart } from "../pages/AddGokart/AddGokart";
import { TournamentManegement } from "../pages/TournamenManagement/TournamentManegement";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { MainNavigationLayout } from "../layouts/MainNavigationLayout";
import { DualNavigationManagment } from "../layouts/DualNavigationManagment";
import { TournamentRides } from "../pages/TournamentEdit/TournamentEditPages/tournamentRides/TournamentRides";
import { TournamentInfo } from "../pages/TournamentEdit/TournamentEditPages/tournamentInfo/TournamentInfo";
import { AddPlayerForTournament } from "../pages/TournamentEdit/TournamentEditPages/addPlayerForTournament/AddPlayerForTournament";
import { PlayersForTournament } from "../pages/TournamentEdit/TournamentEditPages/playersForTournament/PlayersForTournament";
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
          { path: "zawody/:id/kolejka", element: <QueueManagement /> },
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
          { path: ":id/:tournamentName/", element: <TournamentInfo /> },
          {
            path: ":id/:tournamentName/przejazdy",
            element: <TournamentRides />,
          },
          {
            path: ":id/:tournamentName/zawodnicy",
            element: <PlayersForTournament />,
          },
          {
            path: ":id/:tournamentName/dodaj zawodnikow",
            element: <AddPlayerForTournament />,
          },
        ],
      },

      // { path: "przejazd/:id/edytuj", element: <RideEdit /> },
      { path: "zawody/:id/zarzadzanie", element: <TournamentManegement /> },
      // { path: "zawody/:id/edycja/zawodnik", element: <AddPlayer /> },
      // { path: "zawody/:id/edycja/zawodnik/:playerId", element: <AddPlayer /> },
    ],
  },
]);
