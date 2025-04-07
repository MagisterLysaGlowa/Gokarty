import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { Class } from "../../types";
import ClassService from "../services/class";
import {
  handleError,
  handleSuccessWithRefreshWithOnSuccess,
  MutationType,
} from "./queryUtils";
import { successToast } from "../Utils/ToastNotifications";

const useGetAllClasses = (options?: UseQueryOptions<Class[], Error>) => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: async () => await ClassService.getAll<Class>("/class"),
    ...options,
  });
};

const useCreateClass = (options?: MutationType<Class>) => {
  return useMutation({
    ...options,
    mutationFn: async (data: Class) => {
      return await ClassService.create<Class>(data, "/class");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshWithOnSuccess([["classes"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
  });
};

const useUpdateClass = (options?: MutationType<Class>) => {
  return useMutation({
    ...options,
    mutationFn: async (data: Class) => {
      return await ClassService.update<Class>(data, "/class");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshWithOnSuccess(
        [["classes"], ["classes", vars.classId]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useRemoveGokart = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await ClassService.remove(id, "/gokart");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshWithOnSuccess([["classes"]], options?.onSuccess)(
        res,
        vars,
        _
      );
    },
  });
};

export const ClassQueries = {
  getAllClasses: useGetAllClasses,
  createClasse: useCreateClass,
  updateClass: useUpdateClass,
  removeClass: useRemoveGokart,
};
