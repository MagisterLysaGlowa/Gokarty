import { IconType } from "react-icons";
import { FaArchive, FaCar, FaHome, FaTrophy } from "react-icons/fa";
import { IoSchool } from "react-icons/io5";
export type NavbarListElementSchema = {
  id: number;
  name: string;
  icon: IconType;
  to: string;
};
export const navElements: NavbarListElementSchema[] = [
  {
    id: 1,
    name: "Strona główna",
    icon: FaHome,
    to: "/",
  },
  {
    id: 2,
    name: "Zawody",
    icon: FaTrophy,
    to: "/zawody",
  },
  {
    id: 3,
    name: "Szkoły",
    icon: IoSchool,
    to: "/szkoly",
  },
  {
    id: 4,
    name: "Gokarty",
    icon: FaCar,
    to: "/gokart",
  },
  {
    id: 5,
    name: "Archiwum",
    icon: FaArchive,
    to: "/gokart",
  },
];


export const staticPagesNav=[
  navElements[0],
  navElements[3],
  {...navElements[4],to:"/gokarty"}
]