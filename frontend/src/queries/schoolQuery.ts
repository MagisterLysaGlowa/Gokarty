import {
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
  useQuery,
} from "react-query";
import SchoolService from "../services/school";
import { SchoolData, SchoolFormData } from "../../types";
import {
  createSchoolTexts,
  promiseToast,
  removeSchoolTexts,
  updateSchoolTexts,
} from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess } from "./queryUtils";

const useGetAllSchools = (options?: UseQueryOptions<SchoolData[], Error>) => {
  return useQuery({
    queryKey: ["schools"],
    queryFn: SchoolService.getAllSchools,
    ...options,
  });
};

const useCreateSchool = (
  options?: UseMutationOptions<SchoolData, Error, SchoolFormData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: SchoolFormData) => {
      return await promiseToast(
        SchoolService.createSchool(data),
        createSchoolTexts
      );
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["schools"]],
      options?.onSuccess
    ),
  });
};

const useUpdateSchool = (
  options?: UseMutationOptions<
    SchoolData,
    Error,
    { schoolId: number; data: SchoolFormData }
  >
) => {
  return useMutation({
    ...options,
    mutationFn: async ({ schoolId, data }) => {
      return await promiseToast(
        SchoolService.updateSchool(schoolId, data),
        updateSchoolTexts
      );
    },
    onSuccess: (r, v, c) =>
      handleSuccessWithRefreshOnSuccess(
        [["school", r.schoolId], ["schools"]],
        options?.onSuccess
      )(r, v, c),
  });
};

const useRemoveSchool = (
  options?: UseMutationOptions<number, Error, number>
) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await promiseToast(
        SchoolService.removeSchool(id),
        removeSchoolTexts
      );
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["schools"]],
      options?.onSuccess
    ),
  });
};

export const SchoolQueries = {
  getAllSchools: useGetAllSchools,
  createSchool: useCreateSchool,
  updateSchool: useUpdateSchool,
  removeSchool: useRemoveSchool,
};
