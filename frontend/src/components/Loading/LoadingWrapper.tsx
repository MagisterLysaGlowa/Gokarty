import { Loading } from "./Loading";

type LoadingWrapperProps<T> = {
  children: (data: T) => React.ReactNode;
  isLoading: boolean;
  data: T | null | undefined;
};

export const LoadingWrapper = <T,>({ isLoading, data, children }: LoadingWrapperProps<T>) => {
  if (isLoading) {
    return <div className="w-full h-full flex justify-center"><Loading /></div>;
  }
  
  if (data) {
    const content = children(data);
    return <>{content ?? null}</>;
  }
  
  return <div className="w-full h-full flex items-center justify-center">Brak danych</div>;
};