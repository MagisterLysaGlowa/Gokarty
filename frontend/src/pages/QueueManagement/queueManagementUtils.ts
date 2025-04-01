import { useMemo } from "react";
import { FullQueueData } from "../../../types";

export const useGetCols = () =>
  useMemo(
    () => [
      {
        key: "lp",
        label: "Miejsce w kolejce",
      },
      {
        key: "person",
        label: "Osoba",
      },
      {
        key: "school",
        label: "Szkoła",
      },
      {
        key: "gokart",
        label: "Gokart",
      },
    ],
    []
  );

export const useGetRows = (players: FullQueueData[] | undefined) =>
  useMemo(
    () =>
      players?.map((z, index) => ({
        lp: `${index + 1}`,
        person: `${z.player.name} ${z.player.surname}`,
        gokart: z.gokart.name,
        school: z.player.school.name,
      })) || [],
    [players]
  );
