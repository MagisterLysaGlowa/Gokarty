import { Outlet } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext/AuthContext";
function App() {
  return (
    <main className="min-h-dvh h-dvh w-full bg-[#141414]">
      <AuthContextProvider>
        <Outlet />
      </AuthContextProvider>
    </main>
  );
}

export default App;
