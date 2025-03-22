import { useMemo } from "react";
import { GokartData } from "../../../types";

export const useGetGokartColumns = () =>
  useMemo(
    () => [
      {
        label: "Lp",
        key: "lp",
      },
      {
        label: "Nazwa",
        key: "name",
      },
      {
        label: "Akcje",
        key: "actions",
      },
    ],
    []
  );

export const useGetGokartRows = (
  gokarts: GokartData[] | undefined,
  filter: string
) =>
  useMemo(
    () =>
      gokarts
        ?.map((z, index) => ({
          lp: index + 1,
          key: z.gokartId,
          name: z.name,
        }))
        .filter((z) =>
          z.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        ) || [],
    [gokarts, filter]
  );
