import { FullRideData } from "../../../types";
import { convertTimeToString } from "../../Utils/TimeUtils";

export const getTableTextColor = (number: number) => {
  switch (number) {
    case 0:
      return "text-yellow-500";
    case 1:
      return "text-gray-500";
    case 2:
      return "text-amber-900";
    default:
      return "text-white";
  }
};

export const columns = [
  {
    key: "pozycja",
    label: "POZYCJA",
  },
  {
    key: "osoba",
    label: "OSOBA",
  },
  {
    key: "gokart",
    label: "Gokart",
  },
  {
    key: "czas",
    label: "CZAS",
  },
  {
    key: "roznica",
    label: "ROZNICA",
  },
];

export const getRows = (data: FullRideData[] | undefined) => {
  return data
    ?.map((z, index, array) => ({
      roznica:
        "+" +
        convertTimeToString(index == 0 ? 0 : array[index].time - array[0].time),
      pozycja: index + 1,
      key: index,
      osoba: `${z.player.name} ${z.player.surname}`,
      gokart: z.gokart.name,
      czas: convertTimeToString(z.time),
    }))
    .slice(0, 10);
};
