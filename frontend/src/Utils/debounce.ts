import { useEffect, useState } from "react";

export const useDebounce = <T>(value: T, delayTime = 500) => {
  const [filter, setFilter] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setFilter(value);
    }, delayTime);
    return () => clearTimeout(timeout);
  }, [delayTime, value]);

  return filter;
};
