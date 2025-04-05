import {
  MutationOptions,
  QueryClient,
  QueryKey,
  UseMutationOptions,
} from "react-query";
import { queryClient } from "../Utils/ReactQueryConfig";
import { QueryResponse } from "../services/baseService";
import { errorToast } from "../Utils/ToastNotifications";
import { AxiosError } from "axios";

/**
 *
 * @param queryClient react-query client
 * @param queryKeys klucze do odświeżenia podane jako tablica tablic
 */
export const refreshQueries = (
  queryClient: QueryClient,
  queryKeys: QueryKey[]
) => {
  queryKeys.forEach((key) => {
    queryClient.invalidateQueries(key);
  });
};

/**
 *
 * @param queryKeys klucze do odświeżenia podane jako tablica tablic
 * @param userOnSuccess metoda onSuccess ktora jest zdefiniowana w opcjach hooka w danym komponencie
 * @returns funkcje która wykonuje odświeżenie danych o podanym kluczu i OnSuccess w miejscu użycia
 */
export const handleSuccessWithRefreshWithOnSuccess = <
  TData,
  TVariables,
  TContext
>(
  queryKeys: QueryKey[],
  userOnSuccess?: MutationOptions<
    TData,
    Error,
    TVariables,
    TContext
  >["onSuccess"]
) => {
  return (data: TData, variables: TVariables, context: TContext) => {
    refreshQueries(queryClient, queryKeys);
    userOnSuccess?.(data, variables, context);
  };
};

export const handleError = (err: AxiosError) => {
  errorToast((err.response?.data as QueryResponse).message);
};

export type MutationType<T> = UseMutationOptions<QueryResponse, Error, T>;
