import { GokartData } from "../../../types";
import { queryClient } from "../../Utils/ReactQueryConfig";

export const resetGokartValues: GokartData = {
  gokartId: -1,
  name: "",
};

export const AddCreatedGokartToList = async (newGokart: GokartData) => {
  queryClient.setQueryData("getGokarts", (prev: GokartData[] | undefined) => {
    return prev ? [...prev, newGokart] : [newGokart];
  });
};

export const RemoveCreatedGokartFromList = async (removeId: number) => {
  queryClient.setQueryData("getGokarts", (prev: GokartData[] | undefined) => {
    return prev ? prev.filter((gokart) => gokart.gokartId != removeId) : [];
  });
};

export const EditCertainGokartInList = async (element: GokartData) => {
  queryClient.setQueryData("getGokarts", (prev: GokartData[] | undefined) => {
    return prev
      ? prev.map((z) => (z.gokartId === element.gokartId ? element : z))
      : [];
  });
};
