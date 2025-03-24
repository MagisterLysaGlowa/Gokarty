import React, { Dispatch, FC, SetStateAction } from "react";
import { FullQueueData, FullRideData, TournamentData } from "../../../../types";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { convertTimeToString } from "../../../Utils/TimeUtils";
import { FaGripLinesVertical } from "react-icons/fa";
import { motion } from "framer-motion";

type TournamentRightPanelProps = {
  tournament: TournamentData | undefined;
  lastRide: FullRideData | undefined;
  rides: FullRideData[] | undefined;
  currentRide: FullQueueData | undefined | null;
  queue: FullQueueData[] | undefined;
  isVisible: boolean;
  setIsRightPanelVisible: Dispatch<SetStateAction<boolean>>;
};

export const TournamentRightPanel: FC<TournamentRightPanelProps> = ({
  currentRide,
  lastRide,
  queue,
  rides,
  tournament,
  isVisible,
  setIsRightPanelVisible,
}) => {
  return (
    // main div
    <div className="lg:w-4/12">
      {/* right */}
      <div
        onClick={() => setIsRightPanelVisible(!isVisible)}
        className={`h-dvh fixed left-0 w-4 top-0 ${
          isVisible ? "h-full" : "h-0"
        }`}
      >
        <button
          onClick={() => setIsRightPanelVisible(!isVisible)}
          className={`w-4 h-20 bg-nav-bg border-y-2 border-l-2 flex items-center rounded-l-md border-main-default lg:hidden fixed top-[40%] ${
            isVisible ? "left-0" : "right-0"
          }`}
        >
          <FaGripLinesVertical className="text-main-default" />
        </button>
      </div>

      <div
        className={`lg:flex flex-col flex-1 gap-3 lg:w-full w-[calc(100%-16px)] bg-nav-bg top-0 lg:left-0 left-4 lg:h-full h-dvh fixed lg:static ${
          isVisible ? "visible" : "hidden"
        } overflow-hidden rounded-lg`}
      >
        {tournament && tournament.tournamentStateId == 2 && (
          <div className="h-full grid grid-rows-[40%_30%_30%] tableInfoBox border-2 border-main-default rounded-lg overflow-hidden">
            <div className="tableInfoBoxRowBorder flex flex-col">
              <span className="text-center text-main-default text-3xl">
                Ostatni przejazd:
              </span>
              {lastRide && (
                <div className="flex-1 flex-col flex justify-evenly">
                  <div className="flex flex-col gap-1">
                    <div className="text-center flex text-2xl flex-col">
                      <span>
                        {lastRide.player?.name + " " + lastRide.player?.surname}
                      </span>
                      <span className="text-sm">
                        {lastRide.player?.school.acronym}
                      </span>
                    </div>
                    <div className="headers grid grid-cols-2 text-center text-sm xs:text-md sm:text-lg lg:text-lg content-center text-gray-500">
                      <span>Gokart:</span>
                      <span>Czas:</span>
                    </div>
                    <div className="grid grid-cols-2 text-center text-sm xs:text-lg sm:text-xl lg:text-lg xl:text-xl">
                      <React.Fragment key={lastRide.rideId}>
                        <span>{lastRide.gokart?.name}</span>
                        <span>{convertTimeToString(lastRide.time)}</span>
                      </React.Fragment>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div className="headers grid grid-cols-3 text-center text-sm xs:text-md sm:text-lg sm:text-xl lg:text-lg items-centers text-gray-400">
                      <span>Pkt karne:</span>
                      <span>Miejsce:</span>
                      <span>Różnica:</span>
                    </div>
                    <div className="grid grid-cols-3 text-center text-sm xs:text-lg lg:text-lg xl:text-xl">
                      <React.Fragment key={lastRide.rideId}>
                        <span className="text-red-700">2</span>
                        <span>
                          {rides && lastRide
                            ? rides.findIndex(
                                (ride) => ride.playerId === lastRide.playerId
                              ) + 1
                            : "Brak pozycji"}
                        </span>
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
  );
};
