import { AiOutlineUsergroupAdd } from "react-icons/ai";
import { FaUsers, FaEdit, FaCar } from "react-icons/fa";

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
    icon: FaUsers,
    path: `${id}/${name}/zawodnicy`,
  },
  {
    id: 2,
    name: "Edycja turnieju",
    icon: FaEdit,
    path: `${id}/${name}`,
  },
  {
    id: 3,
    name: "Przejazdy",
    icon: FaCar,
    path: `${id}/${name}/przejazdy`,
  },
];

export const isSelected = (pathname: string, element: { path: string }) => {
  return decodeURIComponent(pathname.split("/").slice(-1)[0]) ==
    decodeURIComponent(element.path.split("/").slice(-1)[0])
    ? "border-2 border-main-default"
    : "";
};
