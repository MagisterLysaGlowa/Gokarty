import { Tooltip } from "@heroui/react";
import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { isSelected, navList } from "./tournamentSupportNavbarUtils";

export const TournamentSupportNavbar = () => {
  const { id, tournamentName } = useParams();
  const p = useLocation();
  const { pathname } = p;

  return (
    <div className="flex justify-center items-center flex-col gap-10 w-1/12 border-black ">
      {navList(Number(id), tournamentName).map((el) => {
        const selected = isSelected(pathname, el);
        return (
          <React.Fragment key={el.id}>
            <Tooltip content={el.name} showArrow placement="left">
              <Link
                to={el.path}
                className={`w-4/6 aspect-square bg-support grid place-items-center text-3xl rounded-lg hover:bg-nav-bg duration-300 text-main-default ${selected}`}
              >
                <button>
                  <el.icon />
                </button>
              </Link>
            </Tooltip>
          </React.Fragment>
        );
      })}
    </div>
  );
};
