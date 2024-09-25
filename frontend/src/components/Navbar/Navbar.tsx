import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="appNavBar px-5">
      <div className="left">
        <div>
          <img src="/images/gokart.png" alt="Logo" />
        </div>
        <div>
          <ul>
            <li>
              <Link to={"/"}>Strona Główna</Link>
            </li>
            <li>
              <Link to={"/zawody"}>Zawody</Link>
            </li>
            <li>
              <Link to={"/"}>Archiwum</Link>
            </li>
          </ul>
        </div>
      </div>
      <div>
        <Link to={"/"}>Zaloguj</Link>
      </div>
    </nav>
  );
};
export default Navbar;