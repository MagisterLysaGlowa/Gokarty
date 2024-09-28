import { GokartData } from "../../../types";

export const sortListElements = (
  selectedGokarts: number[],
  a: GokartData,
  b: GokartData
) => {
  if (
    selectedGokarts.includes(a.gokartId) &&
    !selectedGokarts.includes(b.gokartId)
  )
    return -1;
  if (
    !selectedGokarts.includes(a.gokartId) &&
    selectedGokarts.includes(b.gokartId)
  )
    return 1;
  return 0;
};
