import "./tournamentTable.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RideQueries } from "../../queries/rideQuery";
import { QueueQueries } from "../../queries/queueQuery";
import { QueueData, RideData } from "../../../types";
import { TournamentQueries } from "../../queries/tournamentQuery";
import { PaginationButtons } from "./tournamentTableComponents/PaginationButtons";
import { PaginationProgressBar } from "./tournamentTableComponents/PaginationProgressBar";
import { RidesTable } from "./tournamentTableComponents/RidesTable";
import { TournamentRightPanel } from "./tournamentTableComponents/TournamentRightPanel";
import {
  getPaginationLength,
  useTableUpdate,
  getRows,
} from "./tournamentTableUtils";
import { Footer } from "../../components/componentsExport";

const TournamentTable = () => {
  //swipe detector
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current === null || touchEndX.current === null) return;

    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 25) {
      if (intervalRef.current) clearInterval(intervalRef.current); // stop auto padding

      if (diff > 0) {
        // Swipe left
        setPage(
          (prev) => (prev + 1) % getPaginationLength(rides?.length || 0, pos)
        );
      } else {
        // Swipe right
        setPage(
          (prev) =>
            (prev - 1 + getPaginationLength(rides?.length || 0, pos)) %
            getPaginationLength(rides?.length || 0, pos)
        );
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  const { id } = useParams();
  const [page, setPage] = useState(0);
  const pos = 10;

  const [currentRide, setCurrentRide] = useState<
    QueueData | null | undefined
  >(null);
  const [queue, setQueue] = useState<QueueData[] | null | undefined>([]);
  const [lastRide, setLastRide] = useState<RideData | null | undefined>(
    null
  );
  const [rides, setRides] = useState<RideData[] | null | undefined>([]);

  const { data: tournament } = TournamentQueries.getTournament(Number(id));
  const { data: queueData } = QueueQueries.getAllFullQueuesForTournament(
    Number(id)
  );
  const { data: lastRideData } = RideQueries.getTournamentLastFullRide(
    Number(id)
  );
  const { data: ridesData } = RideQueries.getTournamentBestFullRides(
    Number(id)
  );

  useEffect(() => {
    setQueue(queueData ? queueData.splice(1, queueData.length - 1) : []);
    setCurrentRide(queueData ? queueData[0] : null)
  }, [queueData]);
  useEffect(() => {
    setLastRide(lastRideData);
  }, [lastRideData]);
  useEffect(() => {
    setRides(ridesData);
  }, [ridesData]);

  useTableUpdate((newData) => {
    setCurrentRide(newData.queue ? newData.queue[0] : null);
    setQueue(newData.queue);
    setLastRide(newData.lastRide);
    setRides(newData.rides);
  });

  const time = 10000;
  const [rows, setRows] = useState(getRows(rides, page, pos));

  useEffect(() => {
    if (rides) setRows(getRows(rides, page, pos));
  }, [page, rides]);

  const intervalRef = useRef<number | null>(null);

  //swipe detectour for table
  useEffect(() => {
    const container = document.getElementById("tournament-table");

    if (container) {
      container.addEventListener("touchstart", handleTouchStart);
      container.addEventListener("touchend", handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart);
        container.removeEventListener("touchend", handleTouchEnd);
      }
    };
  });

  useEffect(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setPage((p) => (p + 1) % getPaginationLength(rides?.length, pos));
    }, time);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [rides?.length, page]);

  const [isRightPanelVisible, setIsRightPanelVisible] = useState(false);

  return (
    <div className="flex flex-col overflow-auto min-h-full w-full">
      <div className="text-center text-3xl lg:text-5xl p-3 max-h-dvh font-jura flex gap-3 justify-center">
        <span>Tabela</span>
        <span className="text-main-default">Wyników</span>
      </div>
      <div className="py-4 bg-white w-full border-y-8 border-main-default" />
      <div className="flex-1 flex lg:p-3 pb-3">
        {/* tournament table */}
        <div
          id="tournament-table"
          className={`!overflow-hidden w-full lg:w-8/12 flex flex-col`}
        >
          <RidesTable rows={rows} />
          <div className="grid lg:grid-cols-[25%_50%_25%] gap-2 lg:gap-0 place-content-center justify-center items-center">
            <div></div>
            <div className="flex justify-center items-center gap-3">
              <PaginationButtons
                intervalRef={intervalRef}
                pageState={[page, setPage]}
                itemCount={Number(rides?.length)}
                time={time}
                quantity={pos}
              />
            </div>
            <div className="mx-auto">
              <PaginationProgressBar page={page} time={time} />
            </div>
          </div>
        </div>

        {/* right panel */}
        <TournamentRightPanel
          tournament={tournament}
          lastRide={lastRide}
          rides={rides}
          currentRide={currentRide}
          queue={queue}
          isVisible={isRightPanelVisible}
          setIsRightPanelVisible={setIsRightPanelVisible}
        />
      </div>
      <div className="py-4 bg-white w-full border-y-8 border-main-default" />
      <Footer />
    </div>
  );
};
export default TournamentTable;
