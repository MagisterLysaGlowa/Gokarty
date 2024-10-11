import { SchoolData } from "../../../types";
import { queryClient } from "../../Utils/ReactQueryConfig";

export const resetSchoolValues: SchoolData = {
  acronym: "",
  city: "",
  name: "",
  schoolId: -1,
};

export const removeSchoolFromList = (removeId: number) => {
  queryClient.setQueryData(
    "schoolManagementGetSchools",
    (prev: SchoolData[] | undefined) => {
      return prev ? prev.filter((school) => school.schoolId != removeId) : [];
    }
  );
};

export const addSchoolToList = (school: SchoolData) => {
  queryClient.setQueryData(
    "schoolManagementGetSchools",
    (prev: SchoolData[] | undefined) => {
      return prev ? [...prev, school] : [];
    }
  );
};

export const updateCertainSchool = (updatedSchool: SchoolData) => {
  queryClient.setQueryData(
    "schoolManagementGetSchools",
    (prev: SchoolData[] | undefined) => {
      return prev
        ? prev.map((school) =>
            school.schoolId == updatedSchool.schoolId ? updatedSchool : school
          )
        : [];
    }
  );
};
