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
        ?.filter((z) =>
          z.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        )
        .map((z, index) => ({
          id: z.gokartId?.toString() ?? "",
          lp: (index + 1).toString(),
          name: z.name,
        })) || [],
    [gokarts, filter]
  );
