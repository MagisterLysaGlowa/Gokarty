import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar/Navbar";
import { PageHeader } from "../components/PageHeader/PageHeader";

export const MainNavigationLayout = () => {
  return (
    <main className="flex w-full">
      <Navbar />
      <div className="w-nav-w" />
      <div className="flex flex-col flex-1 p-4">
        <PageHeader />
        <Outlet />
      </div>
    </main>
  );
};
