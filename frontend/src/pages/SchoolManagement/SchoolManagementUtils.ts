import { useMemo } from "react";
import { ClassData, SchoolData } from "../../../types";

export const useGetColumns = () =>
  useMemo(
    () => [
      { key: "lp", label: "LP" },
      { key: "name", label: "Nazwa" },
      { key: "city", label: "Miasto" },
      { key: "acronym", label: "Skrót" },
      { key: "actions", label: "Akcje" },
    ],
    []
  );

export const useMemorizedSchoolsData = (
  data: SchoolData[] | undefined,
  filter: string
) => {
  return useMemo(() => {
    return (
      data
        ?.filter((z) =>
          z.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
        )
        .map((z, index) => ({
          lp: (index + 1).toString(),
          id: z.schoolId?.toString() ?? "",
          name: z.name,
          city: z.city,
          acronym: z.acronym,
        })) || []
    );
  }, [data, filter]);
};

export const useGetClassesColumns = () =>
  useMemo(
    () => [
      {
        key: "lp",
        label: "Lp.",
      },
      {
        key: "name",
        label: "Nazwa",
      },
      {
        key: "actions",
        label: "Akcje",
      },
    ],
    []
  );

export const useGetClassRows = (
  classes: ClassData[] | undefined,
  selectedRow: number | undefined
) =>
  useMemo(
    () =>
      classes
        ?.filter((z) => z.schoolId == selectedRow)
        .map((z, index) => ({
          lp: index + 1,
          id: z.classId,
          name: z.name,
        })) || [],
    [classes, selectedRow]
  );
