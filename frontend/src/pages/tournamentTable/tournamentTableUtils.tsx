import { useCallback, useEffect } from "react";
import { FullQueueData, FullRideData } from "../../../types";
import { convertTimeToString } from "../../Utils/TimeUtils";
import * as signalR from "@microsoft/signalr";

export type TournamentTableUpdateData = {
  currentRide: FullQueueData;
  queue: FullQueueData[];
  lastRide: FullRideData;
  rides: FullRideData[];
}

export const useTableUpdate = (onUpdate: (data: TournamentTableUpdateData) => void) => {
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
      })

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
    key: "pozycja",
    label: "POZYCJA",
  },
  {
    key: "osoba",
    label: "OSOBA",
  },
  {
    key: "gokart",
    label: "Gokart",
  },
  {
    key: "czas",
    label: "CZAS",
  },
  {
    key: "roznica",
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
      roznica:
        index === 0
          ? ""
          : "+" +
            convertTimeToString(
              index == 0 ? 0 : array[index].time - array[0].time
            ),
      pozycja: index < 9 ? `#0${index + 1}` : `#${index + 1}`,
      key: index,
      osoba: `${z.player.name} ${z.player.surname}`,
      gokart: z.gokart.name,
      czas: convertTimeToString(z.time),
      szkola: z.player.school.acronym,
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
  roznica: string;
  pozycja: string;
  key: number;
  osoba: string;
  gokart: string;
  czas: string;
  szkola: string;
};

export const useCustomTableRows = () => {
  return useCallback((row: TableRowsType, key: React.Key) => {
    const cellValue = row[key as keyof TableRowsType];

    switch (key) {
      case "osoba":
        return (
          <div className="flex flex-col">
            <span>{cellValue}</span>
            <span className="text-sm">{row.szkola}</span>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);
};

export const isAbleToRefetch = (tournamentState: number | undefined) =>
  tournamentState == 2;
