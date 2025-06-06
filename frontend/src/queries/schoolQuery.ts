import {
  useMutation,
  useQuery,
  UseQueryOptions,
} from "react-query";
import SchoolService from "../services/school";
import { SchoolData } from "../../types";
import { handleError, handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess, MutationType } from "./queryUtils";
import { successToast } from "../Utils/ToastNotifications";

const useGetAllSchools = (options?: UseQueryOptions<SchoolData[], Error>) => {
  return useQuery({
    queryKey: ["schools"],
    queryFn: async () => await SchoolService.getAll<SchoolData>("/school"),
    ...options,
  });
};

const useCreateSchool = (
  options?: MutationType<SchoolData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => await SchoolService.create<SchoolData>(data, "/school"),
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["schools"]],
        options?.onSuccess
      )(res, vars, _);
    } 
  });
};

const useUpdateSchool = (
  options?: MutationType<SchoolData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => await SchoolService.update<SchoolData>(data, "/school"),
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["school", vars.schoolId], ["schools"]],
        options?.onSuccess
      )(res, vars, _);
    }
  });
};

const useRemoveSchool = (
  options?: MutationType<number>
) => {
  return useMutation({
    ...options,
    mutationFn: async (id) => await SchoolService.remove(id, "/school"),
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["schools"]],
        options?.onSuccess
      )(res, vars, _);
    }
  });
};

export const SchoolQueries = {
  getAllSchools: useGetAllSchools,
  createSchool: useCreateSchool,
  updateSchool: useUpdateSchool,
  removeSchool: useRemoveSchool,
};
