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
    <div className="md:text-md lg:text-lg sm:text-sm text-xs flex lg:gap-10 md:gap-8 sm:gap-6 xs:gap-4 gap-2 justify-center items-center">
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
