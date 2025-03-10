import "./navbar.css";
import { useEffect, useState } from "react";
import { navElements } from "./navbarUtils";
import { NavbarListElement } from "./NavbarListElement";
import { Divider } from "@heroui/react";
import { useLocation } from "react-router-dom";

const Navbar = () => {
  const [selected, setSelected] = useState(-1);
  const { pathname } = useLocation();

  useEffect(() => {
    if (selected != -1) return;
    setSelected(() => navElements.find((z) => z.to == pathname)!.id);
  }, [pathname, selected]);

  return (
    <nav className="navbar">
      <div className="flex flex-col gap-6">
        {navElements
          .filter((z) => z !== navElements[navElements.length - 1])
          .map((el) => (
            <div key={el.id} className="flex flex-col gap-6">
              <NavbarListElement
                element={el}
                selected={selected}
                setSelected={setSelected}
              />
              {el !== navElements[navElements.length - 2] && (
                <Divider className="w-[90%] mx-auto h-[2px] bg-nav-separator" />
              )}
            </div>
          ))}
      </div>
      <div>
        <NavbarListElement
          element={navElements[navElements.length - 1]}
          selected={selected}
          setSelected={setSelected}
          key={navElements[navElements.length - 1].id}
        />
      </div>
    </nav>
  );
};
export default Navbar;
