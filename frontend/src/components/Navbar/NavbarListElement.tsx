import { Link } from "react-router-dom";
import { NavbarListElementSchema } from "./navbarUtils";

type NavbarListElementProps = {
  element: NavbarListElementSchema;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
  selected: number;
};

export const NavbarListElement: React.FC<NavbarListElementProps> = ({
  element,
  selected,
  setSelected,
}) => {
  return (
    <Link to={element.to} onClick={() => setSelected(element.id)}>
      <div
        key={element.id}
        className={`navbarListElement ${
          selected == element.id ? "text-nav-selected" : "text-nav-default"
        }`}
      >
        <div className="navbarListElementIcon">{<element.icon />}</div>
        <span className="navbarListElementText">{element.name}</span>
      </div>
    </Link>
  );
};
