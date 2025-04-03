import { Link, useLocation } from "react-router-dom";
import { staticPageNav } from "../Navbar/navbarUtils";
import { useEffect, useState } from "react";

export const StaticPageNavbar = () => {
  const [selected, setSelected] = useState(0);
  const { pathname } = useLocation();

  useEffect(() => {
    setSelected(
      () =>
        staticPageNav.find((z) =>
          z.to.substring(1).startsWith(pathname.split("/")[1])
        )?.id ?? 0
    );
  }, [pathname, selected]);
  return (
    <div className="text-md flex gap-10 justify-center items-center text-xl">
      {staticPageNav.map((z) => (
        <Link
          to={z.to}
          className={`text-white ${z.id === selected && "underline"}`}
          key={z.id}
        >
          {z.name}
        </Link>
      ))}
    </div>
  );
};
