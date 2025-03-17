import { Outlet } from "react-router-dom";
import { Navbar } from "../components/componentsExport";
import { TournamentSupportNavbar } from "../components/TournamentSupportNavbar/TournamentSupportNavbar";
import { PageHeader } from "../components/PageHeader/PageHeader";

export const DualNavigationManagment = () => {
  return (
    <div className="flex w-full max-h-dvh h-dvh">
      <Navbar />
      <div className="w-nav-w" />
      <div className="flex h-full flex-col flex-1 p-4">
        <PageHeader />
        <Outlet />
      </div>
      <TournamentSupportNavbar />
    </div>
  );
};
