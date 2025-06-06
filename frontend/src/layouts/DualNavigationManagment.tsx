import { Outlet } from "react-router-dom";
import { Navbar } from "../components/componentsExport";
import { TournamentSupportNavbar } from "../components/TournamentSupportNavbar/TournamentSupportNavbar";
import { PageHeader } from "../components/PageHeader/PageHeader";

export const DualNavigationManagment = () => {
  return (
    <section className="flex w-full h-screen overflow-hidden">
      <Navbar />
      <div className="w-nav-w" />
      <div className="flex flex-col flex-1 h-full p-3">
        <PageHeader />
        <div className="flex flex-col min-h-0 h-full max-h-full">
          <Outlet />
        </div>
      </div>
      <TournamentSupportNavbar />
    </section>
  );
};
