import { IconType } from "react-icons";
import { AiOutlineHome } from "react-icons/ai";
import { GoTrophy } from "react-icons/go";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { IoSchoolOutline } from "react-icons/io5";
import { RxArchive } from "react-icons/rx";
import { TbSteeringWheel } from "react-icons/tb";
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
    icon: AiOutlineHome,
    to: "/",
  },
  {
    id: 2,
    name: "Zawody",
    icon: GoTrophy,
    to: "/zawody",
  },
  {
    id: 3,
    name: "Szkoły",
    icon: IoSchoolOutline,
    to: "/szkoly",
  },
  {
    id: 4,
    name: "Gokarty",
    icon: TbSteeringWheel,
    to: "/gokart",
  },
  {
    id: 5,
    name: "Archiwum",
    icon: RxArchive,
    to: "/gokart",
  },
];

export const staticPageNav: NavbarListElementSchema[] = [
  navElements[0],
  navElements[4],
  { ...navElements[3], to: "/gokarty" },
  { icon: IoIosInformationCircleOutline, id: 20, name: "Informacje", to: "/informacje" },
];
