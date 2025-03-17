import { useMemo } from "react";
import { PlayersWithTimes, Times } from "../../../../../types";

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
    name: string;
    school: string;
  };
  times: Times[];
  gokart: string[];
};

export const useMemorizedRidesData = (
  data: PlayersWithTimes[] | undefined,
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
            name: `${z.player.name} ${z.player.surname}`,
            school: z.player.school.acronym,
          },
          times: z.times.map(({ time, rideNumber, gokart, rideId, isDSQ }) => ({
            time,
            rideNumber,
            gokart,
            rideId,
            isDSQ,
          })),
          gokart: z.times.map(({ gokart }) => gokart.name),
        })) || []
    );
  }, [data, filter]);
};
