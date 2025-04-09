import { useMemo } from "react";
import { RideGroupData, RideData } from "../../../../../types";

export const useGetColumns = () =>
  useMemo(
    () => [
      { key: "lp", label: "LP" },
      { key: "person", label: "Osoba" },
      { key: "times", label: "Czasy" },
      { key: "gokart", label: "Gokarty" },
      { key: "actions", label: "Akcje" },
    ],
    []
  );

export type RowType = {
  lp: number;
  person: {
    id: number;
    name: string;
    school: string;
  };
  times: RideData[];
};

export type RideModalData = {
  player: string;
  school: string;
  playerId: number;
  timeData?: RideData;
};

export const useMemorizedRidesData = (
  data: RideGroupData[] | undefined,
  filter: string
) => {
  return useMemo(() => {
    return (
      data
        ?.filter((z) =>
          `${z.player.name} ${z.player.surname}`
            .toLocaleLowerCase()
            .includes(filter.toLocaleLowerCase())
        )
        ?.map((z, index) => ({
          lp: index + 1,
          person: {
            id: Number(z.player.playerId),
            name: `${z.player.name} ${z.player.surname}`,
            school: String(z.player?.class?.school?.acronym),
          },
          times: z.rides,
        })) || []
    );
  }, [data, filter]);
};
