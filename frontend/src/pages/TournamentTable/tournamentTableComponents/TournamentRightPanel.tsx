import { Dispatch, FC, SetStateAction } from "react";
import {
  QueueData,
  RideAndPersonData,
  TournamentData,
} from "../../../../types";
import { convertTimeToString } from "../../../Utils/TimeUtils";
import { FaGripLinesVertical } from "react-icons/fa";
import { Divider } from "@heroui/react";

type TournamentRightPanelProps = {
  tournament: TournamentData | undefined;
  lastRide: RideAndPersonData | null | undefined;
  rides: RideAndPersonData[] | undefined | null;
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
  isVisible,
  setIsRightPanelVisible,
}) => {
  return (
    <div>
      {/* BACKDROP (mobile only) */}
      {isVisible && (
        <div
          onClick={() => setIsRightPanelVisible(false)}
          className="fixed inset-0 z-0 backdrop-blur-sm lg:hidden"
        ></div>
      )}

      {/* PANEL + TOGGLE BUTTON CONTAINER */}
      <div
        className={`fixed lg:static xl:w-[400px] lg:w-[300px] top-0 right-0 z-50 h-full transition-transform duration-300 ease-in-out transform flex
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
            <div className="w-full flex-1 grid grid-rows-[40%-30%-40%] gap-3 tableInfoBox overflow-y-auto border-2 border-main-default rounded-lg overflow-hidden">
              {/* LAST RIDE */}
              <div className="flex flex-col">
                <span className="text-center text-main-default text-3xl">
                  Ostatni przejazd:
                </span>
                {lastRide && (
                  <div className="flex-1 flex-col flex justify-evenly">
                    <div className="text-center flex xl:text-3xl lg:text-2xl text-xl flex-col">
                      <span>
                        {lastRide.player.name + " " + lastRide.player.surname}
                      </span>
                      <span className="text-sm">
                        {lastRide.class.school?.acronym}
                      </span>
                    </div>

                    <div>
                      <div className="headers grid grid-cols-2 text-center text-sm lg:text-lg text-gray-500">
                        <span>Gokart:</span>
                        <span>Czas:</span>
                      </div>

                      <div className="grid grid-cols-2 text-center text-lg lg:text-xl xl:text-2xl">
                        <span>{lastRide.ride.gokart?.name}</span>
                        <span>{convertTimeToString(lastRide.ride.time)}</span>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <div className="headers grid grid-cols-3 text-center text-sm lg:text-lg text-gray-500">
                        <span>Pkt karne:</span>
                        <span>Różnica:</span>
                        <span>Miejsce:</span>
                      </div>

                      <div className="grid grid-cols-3 text-center text-lg lg:text-xl xl:text-2xl">
                        <span className="text-red-700">
                          {lastRide.ride.penaltyPoints}
                        </span>
                        <span className="text-red-700">
                          {lastRide.ride.isDisqualified
                            ? "DSQ"
                            : `+${convertTimeToString(
                                lastRide.ride.time - (rides?.[0].ride.time ?? 0)
                              )}`}
                        </span>
                        <span>
                          {rides && lastRide
                            ? rides.findIndex(
                                (ride) => ride.playerId === lastRide.playerId
                              ) + 1
                            : "Brak pozycji"}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
                <Divider className="bg-gray-500 h-[2px] rounded-lg mt-2" />
              </div>
              {/* CURRENT RIDE */}
              <div className="flex flex-col justify-center">
                <span className="text-center text-main-default text-3xl">
                  Jedzie:
                </span>
                <div className="flex justify-center flex-1">
                  {currentRide && (
                    <>
                      <div className="flex flex-col justify-evenly text-2xl items-center">
                        <div className=" text-center items-center flex xl:text-3xl lg:text-2xl text-xl flex-col">
                          <div className="flex lg:flex-row flex-col">
                            <span className="text-2xl">
                              {currentRide.player.name +
                                " " +
                                currentRide.player.surname}
                            </span>
                          </div>
                          <span className="text-sm">
                            {currentRide.player.class?.school?.acronym +
                              " klasa"}
                          </span>
                        </div>
                        <div className="flex lg:flex-row flex-col text-md lg:text-lg text-center">
                          <span>W gokardzie:&nbsp;</span>
                          <span>{currentRide.gokart.name}</span>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <Divider className="bg-gray-500 h-[2px] rounded-lg mt-2" />
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
        </div>
      </div>
    </div>
  );
};
