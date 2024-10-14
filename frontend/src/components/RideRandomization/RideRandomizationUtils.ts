import { GokartData, QueueFormData } from "../../../types";

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

export const gokartCheckboxChangeHandler = (
  queue: QueueFormData,
  SetQueue: React.Dispatch<React.SetStateAction<QueueFormData>>,
  gokart: GokartData
) => {
  const queueGokarts = queue.gokartIds.includes(gokart.gokartId)
    ? queue.gokartIds.filter((z) => z != gokart.gokartId)
    : [...queue.gokartIds, gokart.gokartId];
  SetQueue((prev) => ({ ...prev, gokartIds: queueGokarts }));
};
