import "./tournamentEdit.css";
import { useState } from "react";

import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { IconType } from "react-icons";
import { FaCar, FaEdit, FaUsers } from "react-icons/fa";
import React from "react";
import { Divider, Tooltip } from "@heroui/react";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { TournamentInfo } from "./TournamentEditPages/TournamentInfo";
import { TournamentRides } from "./TournamentEditPages/TournamentRides";

const TournamentEdit = () => {
  /*
    Ustawia date zakończenia zawodów na date rozpoczęcia zawodów
    gdy aktualizujesz zawody które są w fazie planowania.
    Wynika to z walidacji dat turnieju gdzie data końca
    nie może być mniejsza niż data startu.
  */
  type NavList = {
    id: number;
    name: string;
    icon: IconType;
    element: options;
  };
  enum options {
    Edycja = 0,
    DodajGracza,
    Gracze,
    Przejazdy,
  }
  const navList: NavList[] = [
    {
      id: 0,
      name: "Dodaj zawodnika",
      icon: AiOutlineUsergroupAdd,
      element: options.DodajGracza,
    },
    {
      id: 1,
      name: "Zawodnicy",
      icon: FaUsers,
      element: options.Gracze,
    },
    {
      id: 2,
      name: "Edycja turnieju",
      icon: FaEdit,
      element: options.Edycja,
    },
    {
      id: 3,
      name: "Przejazdy",
      icon: FaCar,
      element: options.Przejazdy,
    },
  ];

  const getComponent = (path: options) => {
    switch (path) {
      case options.Edycja:
        return <TournamentInfo />;
      case options.DodajGracza:
        return <h1>Cosik</h1>;
      case options.Gracze:
        return <h1>Gracze</h1>;
      case options.Przejazdy:
        return <TournamentRides />;
      default:
        return <h1>Syf</h1>;
    }
  };
  const [path, setPath] = useState<options>(options.Edycja);

  return (
    <div className="page flex min-h-full max-h-full">
      <div className="w-11/12 flex flex-col">
        <PageHeader />
        <div className="w-full flex-1 overflow-auto">{getComponent(path)}</div>
      </div>
      <div className="flex items-center justify-center flex-col w-1/12">
        <div className="flex justify-center items-center flex-col gap-10">
          {navList.map((el, index) => (
            <React.Fragment key={el.id}>
              <Tooltip content={el.name} showArrow placement="left">
                <button
                  className={`homeNavigationElement !aspect-square ${
                    path === el.element ? "selectedNavIcon" : ""
                  }`}
                  onClick={() => setPath(el.element)}
                >
                  <el.icon />
                </button>
              </Tooltip>
              {index < navList.length - 1 && (
                <Divider
                  orientation="horizontal"
                  className="h-[4px] rounded-lg"
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TournamentEdit;
