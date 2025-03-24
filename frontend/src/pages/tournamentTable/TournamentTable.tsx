import "./tournamentTable.css";
import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { RideQueries } from "../../queries/rideQuery";
import { QueueQueries } from "../../queries/queueQuery";
import {
  getPaginationLength,
  getRows,
  isAbleToRefetch,
} from "./tournamentTableUtils";
import { TournamentQueries } from "../../queries/tournamentQuery";
import { RidesTable } from "./tournamentTableComponents/RidesTable";
import { PaginationButtons } from "./tournamentTableComponents/PaginationButtons";
import { PaginationProgressBar } from "./tournamentTableComponents/PaginationProgressBar";
import { TournamentRightPanel } from "./tournamentTableComponents/TournamentRightPanel";

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

  const { data: tournament } = TournamentQueries.getTournament(Number(id));

  const { data: currentRide } = QueueQueries.getFullActiveQueueForTournament(
    Number(id),
    {
      refetchInterval: 3000,
      enabled: !!isAbleToRefetch(tournament?.tournamentStateId),
    }
  );

  const { data: queue } = QueueQueries.getAllFullQueuesForTournament(
    Number(id),
    {
      refetchInterval: 3000,
      enabled: !!isAbleToRefetch(tournament?.tournamentStateId),
    }
  );

  const { data: lastRide } = RideQueries.getTournamentLastFullRide(Number(id), {
    refetchInterval: 3000,
    enabled: !!isAbleToRefetch(tournament?.tournamentStateId),
  });

  const time = 10000;

  const { data: rides } = RideQueries.getTournamentBestFullRides(Number(id), {
    refetchInterval: tournament?.tournamentStateId === 2 ? time : false,
    enabled: tournament?.tournamentStateId !== 1,
  });

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
                rides={rides}
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
      <div className="p-3 w-full">
        <p className="text-white font-bold text-center">
          Mechanik OG full gangsta © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
export default TournamentTable;
