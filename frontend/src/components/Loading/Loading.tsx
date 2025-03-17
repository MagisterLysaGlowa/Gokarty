import { ClockLoader } from "react-spinners";

export const Loading = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <ClockLoader
      color="#eab308"
      size={100}
      loading={isLoading}
      className="mx-auto flex-1 grid place-items-center m-3"
    />
  );
};
