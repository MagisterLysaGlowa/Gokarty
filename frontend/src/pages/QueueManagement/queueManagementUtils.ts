import { useMemo } from "react";
import { QueueData } from "../../../types";
import { Socket } from "socket.io-client";

export const onEvent = (
  socket: Socket | undefined,
  event: string,
  callback: (data: any) => void
) => {
  socket?.on(event, callback);
  return () => {
    socket?.off(event, callback);
  };
};

export const useGetCols = () =>
  useMemo(
    () => [
      {
        key: "lp",
        label: "Miejsce w kolejce",
      },
      {
        key: "person",
        label: "Osoba",
      },
      {
        key: "school",
        label: "Szkoła",
      },
      {
        key: "gokart",
        label: "Gokart",
      },
    ],
    []
  );

export const useGetRows = (players: QueueData[] | undefined) =>
  useMemo(
    () =>
      players?.map((z, index) => ({
        lp: `${index + 1}`,
        person: `${z.player.name} ${z.player.surname}`,
        gokart: z.gokart.name,
        school: z.player?.class?.school?.name || "",
      })) || [],
    [players]
  );
