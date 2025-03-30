import { RideData } from "../../../../types";
import { getPaginationLength } from "../tournamentTableUtils";

type PaginationButtonsProps = {
  rides: RideData[] | undefined | null;
  pageState: [number, React.Dispatch<React.SetStateAction<number>>];
  intervalRef: React.MutableRefObject<number | null>;
  time: number;
  quantity: number;
};
export const PaginationButtons: React.FC<PaginationButtonsProps> = ({
  pageState,
  rides,
  intervalRef,
  time,
  quantity,
}) => {
  const [page, setPage] = pageState;

  const buttonClass = (index: number) =>
    `flex-1 max-h-[100px] ${
      index === page ? "bg-main-default" : "bg-support"
    } h-[10px] rounded-lg`;

  return Array.from({
    length: getPaginationLength(rides?.length, quantity),
  }).map((_, index) => (
    <button
      className={buttonClass(index)}
      key={index}
      onClick={() => {
        setPage(index);
        if (intervalRef.current) {
          clearInterval(intervalRef.current);
        }
        intervalRef.current = setInterval(() => {
          setPage(
            (p) => (p + 1) % getPaginationLength(rides?.length, quantity)
          );
        }, time);
      }}
    />
  ));
};
