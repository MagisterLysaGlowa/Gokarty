import {
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions,
} from "react-query";
import GokartService from "../services/gokart";
import { GokartData, GokartFormData } from "../../types";
import {
  createGokartTexts,
  promiseToast,
  updateGokartTexts,
} from "../Utils/ToastNotifications";
import { handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess } from "./queryUtils";

const useGetAllGokarts = (options?: UseQueryOptions<GokartData[], Error>) => {
  return useQuery({
    queryKey: ["gokarts"],
    queryFn: GokartService.getAllGokarts,
    ...options,
  });
};

const useGetGokartByID = (
  id: number,
  options?: UseQueryOptions<GokartData, Error>
) => {
  return useQuery({
    queryKey: ["gokart", id],
    queryFn: async () => await GokartService.getGokart(id),
    enabled: !!id,
    ...options,
  });
};

const useCreateGokart = (
  options?: UseMutationOptions<GokartData, Error, GokartFormData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: GokartFormData) => {
      return await promiseToast(
        GokartService.createGokart(data),
        createGokartTexts
      );
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["gokarts"]],
      options?.onSuccess
    ),
  });
};

const useUpdateGokart = (
  options?: UseMutationOptions<GokartData, Error, GokartData>
) => {
  return useMutation({
    ...options,
    mutationFn: async (data: GokartData) => {
      return await promiseToast(
        GokartService.updateGokart(data.gokartId, data),
        updateGokartTexts
      );
    },
    onSuccess: (r, v, c) => {
      handleSuccessWithRefreshOnSuccess(
        [["gokart", r.gokartId], ["gokarts"]],
        options?.onSuccess
      )(r, v, c);
    },
  });
};

const useRemoveGokart = (
  options?: UseMutationOptions<number, Error, number>
) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await promiseToast(
        GokartService.removeGokart(id),
        updateGokartTexts
      );
    },
    onSuccess: handleSuccessWithRefreshOnSuccess(
      [["gokarts"]],
      options?.onSuccess
    ),
  });
};

export const GokartQueries = {
  getAllGokarts: useGetAllGokarts,
  getGokart: useGetGokartByID,
  createGokart: useCreateGokart,
  updateGokart: useUpdateGokart,
  removeGokart: useRemoveGokart,
};
