import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import { ProtectedPathComponent } from "../components/ProtectedPathComponent/ProtectedPathComponent";
import { DualNavigationManagment } from "../layouts/DualNavigationManagment";
import { EmptyLayout } from "../layouts/EmptyLayout";
import { MainNavigationLayout } from "../layouts/MainNavigationLayout";
import { Forbidden } from "../pages/Errors/Forbidden";
import { AddGokart } from "../pages/GokartManagement/GokartManagement";
import { GokartsPage } from "../pages/GokartsPage/GokartsPage";
import HomePage from "../pages/HomePage/HomePage";
import { InfoPage } from "../pages/InfoPage/InfoPage";
import LoginPage from "../pages/LoginPage/LoginPage";
import { LoginRegister } from "../pages/LoginRegister/LoginRegister";
import { QueueManagement } from "../pages/QueueManagement/QueueManagement";
import { SchoolManagement } from "../pages/SchoolManagement/SchoolManagement";
import { AddPlayerForTournament } from "../pages/TournamentManagement/SubPages/addPlayerForTournament/AddPlayerForTournament";
import { PlayersForTournament } from "../pages/TournamentManagement/SubPages/playersForTournament/PlayersForTournament";
import { TournamentInfo } from "../pages/TournamentManagement/SubPages/tournamentInfo/TournamentInfo";
import { TournamentRides } from "../pages/TournamentManagement/SubPages/tournamentRides/TournamentRides";
import Tournaments from "../pages/Tournaments/Tournaments";
import TournamentTable from "../pages/TournamentTable/TournamentTable";
import { TournamentsPage } from "../pages/TournamntsPage/TournamentsPage";
import { RoleName } from "../Utils/globalUtils";

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
          { path: "zawody/:id/wyniki", element: <TournamentTable /> },
          { path: "informacje", element: <InfoPage /> },
          { path: "gokarty", element: <GokartsPage /> },
          { path: "logowanie", element: <LoginRegister /> },
          { path: "forbidden", element: <Forbidden /> },
          { path: "turnieje", element: <TournamentsPage /> },
        ],
      },
      {
        path: "/",
        element: (
          <ProtectedPathComponent allowedRoles={RoleName.management}>
            <MainNavigationLayout />
          </ProtectedPathComponent>
        ),
        children: [
          { path: "zawody", element: <Tournaments /> },
          { path: "gokart", element: <AddGokart /> },
          { path: "szkoly", element: <SchoolManagement /> },
        ],
      },
      {
        path: "zawody",
        element: (
          <ProtectedPathComponent allowedRoles={RoleName.management}>
            <DualNavigationManagment />
          </ProtectedPathComponent>
        ),
        children: [
          { path: ":id/:tournamentName", element: <TournamentInfo /> },
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
          { path: ":id/:tournamentName/kolejka", element: <QueueManagement /> },
        ],
      },
    ],
  },
]);
