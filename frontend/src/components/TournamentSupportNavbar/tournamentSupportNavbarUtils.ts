import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { HiOutlineQueueList } from "react-icons/hi2";
import { PiFlagCheckeredFill, PiUsersThree } from "react-icons/pi";
import { RiEditLine } from "react-icons/ri";

export const navList = (id: number, name: string | undefined) => [
  {
    id: 0,
    name: "Dodaj zawodnika",
    icon: AiOutlineUsergroupAdd,
    path: `${id}/${name}/dodaj zawodnikow`,
  },
  {
    id: 1,
    name: "Zawodnicy",
    icon: PiUsersThree,
    path: `${id}/${name}/zawodnicy`,
  },
  {
    id: 2,
    name: "Edycja turnieju",
    icon: RiEditLine,
    path: `${id}/${name}`,
  },
  {
    id: 3,
    name: "Przejazdy",
    icon: PiFlagCheckeredFill,
    path: `${id}/${name}/przejazdy`,
  },
  {
    id: 4,
    name: "Kolejka",
    icon: HiOutlineQueueList,
    path: `${id}/${name}/kolejka`,
  },
];

export const isSelected = (pathname: string, element: { path: string }) => {
  return decodeURIComponent(pathname.split("/").slice(-1)[0]) ==
    decodeURIComponent(element.path.split("/").slice(-1)[0])
    ? "border-2 border-main-default"
    : "";
};
