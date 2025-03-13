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
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";
import { convertTimeToString } from "../../Utils/TimeUtils";
import { TournamentQueries } from "../../queries/tournamentQuery";
import React from "react";
import { RidesTable } from "./tournamentTableComponents/RidesTable";
import { PaginationButtons } from "./tournamentTableComponents/PaginationButtons";
import { PaginationProgressBar } from "./tournamentTableComponents/PaginationProgressBar";

const TournamentTable = () => {
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

  const time = 5000;

  const { data: rides } = RideQueries.getTournamentBestFullRides(Number(id), {
    refetchInterval: tournament?.tournamentStateId === 2 ? time : false,
    enabled: tournament?.tournamentStateId !== 1,
  });

  const [rows, setRows] = useState(getRows(rides, page, pos));

  useEffect(() => {
    if (rides) setRows(getRows(rides, page, pos));
  }, [page, rides]);

  const intervalRef = useRef<number | null>(null);

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

  return (
    <div className="flex flex-col overflow-auto min-h-full">
      <div className="text-center text-5xl p-3 max-h-dvh font-jura flex gap-3 justify-center">
        <span>Tabela</span>
        <span className="text-main-default">Wyników</span>
      </div>
      <div className="py-4 bg-white w-full border-y-8 border-main-default" />
      <div className="flex-1 flex p-3">
        <div
          className={`!overflow-hidden ${
            tournament && tournament.tournamentStateId <= 2
              ? "w-8/12"
              : "w-full"
          } flex flex-col`}
        >
          <RidesTable rows={rows} />
          <div className="grid grid-cols-[25%_50%_25%] place-content-center justify-center items-center">
            <div />
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
        <div className="flex flex-col flex-1 gap-3 w-4/12">
          {tournament && tournament.tournamentStateId == 2 && (
            <div className="h-full grid grid-rows-[40%_30%_30%] tableInfoBox border-2 border-main-default">
              <div className="tableInfoBoxRowBorder flex flex-col">
                <span className="text-center text-main-default text-3xl">
                  Ostatni przejazd:
                </span>
                {lastRide && (
                  <div className="flex-1 flex-col flex justify-evenly">
                    <div className="flex flex-col gap-3">
                      <div className="headers grid grid-cols-3 text-center content-center text-gray-500">
                        <span>Osoba:</span>
                        <span>Gokart:</span>
                        <span>Punkty karne:</span>
                      </div>
                      <div className="grid grid-cols-3 text-center items-center text-xl">
                        <React.Fragment key={lastRide.rideId}>
                          <div className="flex flex-col">
                            <span>
                              {lastRide.player.name +
                                " " +
                                lastRide.player.surname}
                            </span>
                            <span className="text-sm">
                              {lastRide.player.school.acronym}
                            </span>
                          </div>
                          <span>{lastRide.gokart.name}</span>
                          <span className="text-red-700">2</span>
                        </React.Fragment>
                      </div>
                    </div>
                    <div className="flex flex-col gap-3">
                      <div className="headers grid grid-cols-3 text-center items-centers text-gray-400">
                        <span>Miejsce:</span>
                        <span>Czas:</span>
                        <span>Różnica:</span>
                      </div>
                      <div className="grid grid-cols-3 text-center text-xl">
                        <React.Fragment key={lastRide.rideId}>
                          <span>
                            {rides && lastRide
                              ? rides.findIndex(
                                  (ride) => ride.playerId === lastRide.playerId
                                ) + 1
                              : "Brak pozycji"}
                          </span>
                          <span>{convertTimeToString(lastRide.time)}</span>
                          <span className="text-red-700">
                            +
                            {convertTimeToString(
                              lastRide.time -
                                (rides && rides[0] ? rides[0].time : 0)
                            )}
                          </span>
                        </React.Fragment>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="tableInfoBoxRowBorder flex flex-col justify-center">
                <span className="text-center text-main-default text-3xl">
                  Jedzie:
                </span>
                <div className="flex items-center justify-between flex-1">
                  {currentRide && (
                    <React.Fragment key={currentRide.queueId}>
                      <FaArrowRightLong className="text-4xl text-main-default" />
                      <div className="flex w-full justify-evenly text-2xl">
                        <div>
                          {currentRide.player.name +
                            " " +
                            currentRide.player.surname}
                        </div>
                        <div>{currentRide.gokart.name}</div>
                      </div>
                      <FaArrowLeftLong className="text-4xl text-main-default" />
                    </React.Fragment>
                  )}
                </div>
              </div>
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <span className="text-center w-full text-main-default text-3xl">
                  Nastepni:
                </span>
                <ol className="text-xl flex-1">
                  {queue?.slice(0, 3).map(({ player }) => (
                    <li>{`${player.name} ${player.surname}`}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
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
