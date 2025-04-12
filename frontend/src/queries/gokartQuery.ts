import {
  useMutation,
  useQuery,
  UseQueryOptions,
} from "react-query";
import GokartService from "../services/gokart";
import { GokartData } from "../../types";
import {
  handleError,
  handleSuccessWithRefreshWithOnSuccess as handleSuccessWithRefreshOnSuccess,
  MutationType,
} from "./queryUtils";
import { successToast } from "../Utils/ToastNotifications";

const useGetAllGokarts = (options?: UseQueryOptions<GokartData[], Error>) => {
  return useQuery({
    queryKey: ["gokarts"],
    queryFn: async () => await GokartService.getAll<GokartData>("/gokart"),
    ...options,
  });
};

const useCreateGokart = (options?: MutationType<{gokart: GokartData, image?: File}>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("gokart", JSON.stringify(data.gokart));
      if(data.image)
        formData.append("image", data.image);
      return await GokartService.create<GokartData>(formData, "/gokart");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["gokart", vars.gokart.gokartId], ["gokarts"]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useUpdateGokart = (options?: MutationType<{gokart: GokartData, image?: File}>) => {
  return useMutation({
    ...options,
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("gokart", JSON.stringify(data.gokart));
      if(data.image)
        formData.append("image", data.image);
      return await GokartService.update<GokartData>(formData, "/gokart");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["gokart", vars.gokart.gokartId], ["gokarts"]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useRemoveGokart = (options?: MutationType<number>) => {
  return useMutation({
    ...options,
    mutationFn: async (id: number) => {
      return await GokartService.remove(id, "/gokart");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["gokarts"]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

const useRemoveGokarts = (options?: MutationType<number[]>) => {
  return useMutation({
    ...options,
    mutationFn: async (ids) => {
      return await GokartService.massRemove(ids, "/gokart/massRemove");
    },
    onError: handleError,
    onSuccess: (res, vars, _) => {
      successToast(res.message);
      handleSuccessWithRefreshOnSuccess(
        [["gokarts"]],
        options?.onSuccess
      )(res, vars, _);
    },
  });
};

export const GokartQueries = {
  getAllGokarts: useGetAllGokarts,
  createGokart: useCreateGokart,
  updateGokart: useUpdateGokart,
  removeGokart: useRemoveGokart,
  removeGokarts: useRemoveGokarts,
};
