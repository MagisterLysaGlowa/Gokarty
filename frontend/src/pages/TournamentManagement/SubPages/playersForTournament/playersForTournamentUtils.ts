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
        ?.map((z, index) => ({Lp: (index + 1).toString(), id: z.playerId.toString(), name: z.name, surname: z.surname, school: z.school.acronym, birthDate: z.birthDate.toLocaleDateString()})) || [],
    [data, filterSearch]
  );
};
