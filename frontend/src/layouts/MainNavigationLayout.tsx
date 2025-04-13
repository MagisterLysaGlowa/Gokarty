import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { PageHeader } from "../components/PageHeader/PageHeader";

export const MainNavigationLayout = () => {
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
    </section>
  );
};
