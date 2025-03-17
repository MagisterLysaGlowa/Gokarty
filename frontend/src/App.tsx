import { Outlet } from "react-router-dom";
function App() {
  return (
    <main className="min-h-dvh h-dvh flex w-full bg-[#141414]">
      <Outlet />
    </main>
  );
}

export default App;
