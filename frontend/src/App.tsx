import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar/Navbar";
import { Outlet } from "react-router-dom";
import { Footer } from "./components/componentsExport";

function App() {
  return (
    <>
      <Navbar />
      <div
        className="window"
        style={{
          minHeight: "calc(100vh - 75px - 60px)",
          overflowY: "auto",
          backgroundColor: "#F7F7F7",
        }}
      >
        <Outlet />
      </div>
      <Footer />
    </>
  );
}

export default App;
