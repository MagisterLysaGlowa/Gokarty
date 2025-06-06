import { useMemo } from "react";
import { PlayerData } from "../../../../../types";

export const useGetColumns = () =>
  useMemo(
    () => [
      { key: "lp", label: "Lp" },
      { key: "name", label: "name" },
      { key: "surname", label: "surname" },
      { key: "birthDate", label: "birthDate" },
      { key: "school", label: "school" },
      { key: "actions", label: "akcje" },
    ],
    []
  );

export const useGetMemorizedData = (
  data: PlayerData[] | undefined,
  filterSearch: string
) => {
  return useMemo(
    () =>
      data?.filter((z) =>
        `${z.name} ${z.surname}`
          .toLocaleLowerCase()
          .includes(filterSearch.toLocaleLowerCase())
      )
      ?.map((z, index) => ({lp: index + 1, id: z.playerId || "", name: z.name, surname: z.surname, school: z.class?.school?.acronym || "", birthDate: z.birthDate.toLocaleDateString()})) || [],
    [data, filterSearch]
  );
};
