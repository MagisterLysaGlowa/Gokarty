import { Dispatch, FC, SetStateAction } from "react";
import { QueueData, RideData, TournamentData } from "../../../../types";
import { FaArrowRightLong, FaArrowLeftLong } from "react-icons/fa6";
import { convertTimeToString } from "../../../Utils/TimeUtils";
import { FaGripLinesVertical } from "react-icons/fa";

type TournamentRightPanelProps = {
  tournament: TournamentData | undefined;
  lastRide: RideData | null | undefined;
  rides: RideData[] | undefined | null;
  currentRide: QueueData | undefined | null;
  queue: QueueData[] | undefined | null;
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
    <div className="lg:w-4/12">
      {/* BACKDROP (mobile only) */}
      {isVisible && (
        <div
          onClick={() => setIsRightPanelVisible(false)}
          className="fixed inset-0 z-0 backdrop-blur-sm lg:hidden"
        ></div>
      )}

      {/* PANEL + TOGGLE BUTTON CONTAINER */}
      <div
        className={`fixed lg:static top-0 right-0 z-50 h-full transition-transform duration-300 ease-in-out transform flex
        ${isVisible ? "translate-x-0" : "translate-x-full"} lg:translate-x-0`}
      >
        {/* TOGGLE BUTTON (mobile only) */}
        <button
          onClick={() => setIsRightPanelVisible(!isVisible)}
          className="w-4 h-20 bg-nav-bg border-y-2 border-l-2 flex items-center rounded-l-md border-main-default fixed top-[40%] -left-4 lg:hidden"
        >
          <FaGripLinesVertical className="text-main-default" />
        </button>

        {/* PANEL */}
        <div className="flex flex-col gap-3 w-[300px] lg:w-full bg-nav-bg h-dvh lg:h-auto overflow-hidden rounded-l-lg lg:rounded-none ">
          {tournament && tournament.tournamentStateId === 2 && (
            <div className="h-full grid grid-rows-[40%_30%_30%] tableInfoBox border-2 border-main-default rounded-lg overflow-hidden">
              {/* LAST RIDE */}
              <div className="tableInfoBoxRowBorder flex flex-col">
                <span className="text-center text-main-default text-3xl">
                  Ostatni przejazd:
                </span>
                {lastRide && (
                  <div className="flex-1 flex-col flex justify-evenly">
                    <div className="text-center flex text-2xl flex-col">
                      <span>
                        {lastRide.player?.name + " " + lastRide.player?.surname}
                      </span>
                      <span className="text-sm">
                        {lastRide.player?.school.acronym}
                      </span>
                    </div>

                    <div>
                      <div className="headers grid grid-cols-2 text-center text-sm lg:text-lg text-gray-500">
                        <span>Gokart:</span>
                        <span>Czas:</span>
                      </div>

                      <div className="grid grid-cols-2 text-center text-lg lg:text-xl">
                        <span>{lastRide.gokart?.name}</span>
                        <span>{convertTimeToString(lastRide.time)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="headers grid grid-cols-3 text-center text-sm lg:text-lg text-gray-400">
                        <span>Pkt karne:</span>
                        <span>Miejsce:</span>
                        <span>Różnica:</span>
                      </div>

                      <div className="grid grid-cols-3 text-center text-lg lg:text-xl">
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
                            lastRide.time - (rides?.[0]?.time ?? 0)
                          )}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* CURRENT RIDE */}
              <div className="tableInfoBoxRowBorder flex flex-col justify-center">
                <span className="text-center text-main-default text-3xl">
                  Jedzie:
                </span>
                <div className="flex items-center justify-between flex-1">
                  {currentRide && (
                    <>
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
                    </>
                  )}
                </div>
              </div>

              {/* QUEUE */}
              <div className="w-full flex flex-col justify-center items-center gap-3">
                <span className="text-center w-full text-main-default text-3xl">
                  Nastepni:
                </span>
                <ol className="text-xl flex-1">
                  {queue?.slice(0, 3).map(({ player }, i) => (
                    <li key={i}>{`${player.name} ${player.surname}`}</li>
                  ))}
                </ol>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
