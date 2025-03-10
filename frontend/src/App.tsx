import { Outlet, useLocation } from "react-router-dom";
import { Navbar } from "./components/componentsExport";
import { HeroUIProvider } from "@heroui/react";

function App() {
  const location = useLocation();
  const { pathname } = location;

  const regex = /^\/(?:zawody\/\d+\/wyniki)?$/;

  return (
    <HeroUIProvider>
      <main className="min-h-dvh flex w-full bg-[#141414]">
        {!regex.test(pathname) && (
          <>
            <Navbar />
            <div className="w-nav-w" />
          </>
        )}
        <div
          className={`${
            !regex.test(pathname)
              ? "w-[calc(100%-theme(width.nav-w))]"
              : "w-full"
          }`}
        >
          <Outlet />
        </div>
      </main>
    </HeroUIProvider>
  );
}

export default App;
