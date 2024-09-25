import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <main>
      <Navbar />
      <Outlet />
    </main>
  );
}

export default App;
