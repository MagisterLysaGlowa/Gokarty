import { Loading } from "./Loading";

type LoadingWrapperProps<T> = {
  children: (data: T) => React.ReactNode;
  isLoading: boolean;
  data: T | null | undefined;
};

export const LoadingWrapper = <T,>({ isLoading, data, children }: LoadingWrapperProps<T>) => {
  if (isLoading) {
    return <Loading />;
  }
  
  if (data != null) {
    const content = children(data);
    return <>{content ?? null}</>;
  }
  
  return <div className="w-full h-full flex items-center justify-center">Brak danych</div>;
};