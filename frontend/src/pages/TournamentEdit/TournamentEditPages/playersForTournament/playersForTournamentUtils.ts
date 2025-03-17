import { useMemo } from "react";
import { PlayerWithSchoolData } from "../../../../../types";

export const useGetColumns = () =>
  useMemo(
    () => [
      { key: "Lp", label: "Lp" },
      { key: "name", label: "name" },
      { key: "surname", label: "surname" },
      { key: "birthDate", label: "birthDate" },
      { key: "school", label: "school" },
      { key: "actions", label: "akcje" },
    ],
    []
  );

export const useGetMemorizedData = (
  data: PlayerWithSchoolData[] | undefined,
  filterSearch: string
) => {
  return useMemo(
    () =>
      data
        ?.filter((z) =>
          `${z.name} ${z.surname}`
            .toLocaleLowerCase()
            .includes(filterSearch.toLocaleLowerCase())
        )
        ?.map((z, index) => ({ ...z, Lp: index + 1 })) || [],
    [data, filterSearch]
  );
};
