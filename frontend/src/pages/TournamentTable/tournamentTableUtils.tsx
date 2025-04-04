import { useCallback, useEffect } from "react";
import { FullQueueData, FullRideData } from "../../../types";
import { convertTimeToString } from "../../Utils/TimeUtils";
import * as signalR from "@microsoft/signalr";

export type TournamentTableUpdateData = {
  queue: FullQueueData[];
  lastRide: FullRideData;
  rides: FullRideData[];
};

export const useTableUpdate = (
  onUpdate: (data: TournamentTableUpdateData) => void
) => {
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("http://localhost:5079/hubs/tournamentTable")
      .withAutomaticReconnect()
      .build();

    let isMounted = true;

    connection.start().then(() => {
      if (!isMounted) {
        connection.stop();
        return;
      }
      connection.on("tournamentTableUpdate", (data) => {
        onUpdate(data);
      });
    });

    return () => {
      isMounted = false;
      connection.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

export const getTableTextColor = (number: number) => {
  switch (number) {
    case 0:
      return "text-yellow-500";
    case 1:
      return "text-gray-500";
    case 2:
      return "text-amber-900";
    default:
      return "text-white";
  }
};

export const columns = [
  {
    key: "position",
    label: "POZYCJA",
  },
  {
    key: "person",
    label: "OSOBA",
  },
  {
    key: "gokart",
    label: "Gokart",
  },
  {
    key: "time",
    label: "CZAS",
  },
  {
    key: "difference",
    label: "ROZNICA",
  },
];

export const getRows = (
  data: FullRideData[] | undefined | null,
  page: number,
  quantity: number
): TableRowsType[] | undefined => {
  return data
    ?.map((z, index, array) => ({
      difference:
        index === 0
          ? ""
          : "+" +
            convertTimeToString(
              index == 0 ? 0 : array[index].time - array[0].time
            ),
      position: index < 9 ? `#0${index + 1}` : `#${index + 1}`,
      key: index,
      person: `${z.player?.name} ${z.player?.surname}`,
      gokart: z.gokart?.name,
      time: convertTimeToString(z.time),
      school: z.player?.school.acronym,
    }))
    .slice(page * quantity, (page + 1) * quantity);
};

export const clearTableInterval = (
  intervalRef: React.MutableRefObject<number | null>
) => {
  if (intervalRef.current) {
    clearInterval(intervalRef.current);
  }
};

export const getPaginationLength = (
  ridesLength: number | undefined,
  quantity: number
) => Math.ceil((ridesLength ? ridesLength : 0) / quantity);

export type TableRowsType = {
  difference?: string;
  position?: string;
  key: number;
  person?: string;
  gokart?: string;
  time?: string;
  school?: string;
};

export const useCustomTableRows = () => {
  return useCallback((row: TableRowsType, key: React.Key) => {
    const cellValue = row[key as keyof TableRowsType];

    switch (key) {
      case "osoba":
        return (
          <div className="flex flex-col">
            <span>{cellValue}</span>
            <span className="text-sm">{row.school}</span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
};

export const isAbleToRefetch = (tournamentState: number | undefined) =>
  tournamentState == 2;
