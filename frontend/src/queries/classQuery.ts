import { useMutation, useQuery, UseQueryOptions } from "react-query";
import { ClassData } from "../../types";
import ClassService from "../services/class";
import {
  handleError,
  handleSuccessWithRefreshWithOnSuccess,
  MutationType,
} from "./queryUtils";
import { successToast } from "../Utils/ToastNotifications";

const useGetAllClasses = (options?: UseQueryOptions<ClassData[], Error>) => {
  return useQuery({
    queryKey: ["classes"],
    queryFn: async () => await ClassService.getAll<ClassData>("/class"),
    ...options,
  });
};

const useCreateClass = (options?: MutationType<ClassData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data: ClassData) => {
      return await ClassService.create<ClassData>(data, "/class");
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

const useUpdateClass = (options?: MutationType<ClassData>) => {
  return useMutation({
    ...options,
    mutationFn: async (data: ClassData) => {
      return await ClassService.update<ClassData>(data, "/class");
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

const useRemoveClass = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await ClassService.remove(id, "/class");
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

const useRemoveClasses = (options?: MutationType<number[]>) => {
  return useMutation({
    ...options,
    mutationFn: async (ids) => {
      return await ClassService.massRemove(ids, "/class/massRemove");
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
  createClass: useCreateClass,
  updateClass: useUpdateClass,
  removeClass: useRemoveClass,
  removeClasses: useRemoveClasses,
};
