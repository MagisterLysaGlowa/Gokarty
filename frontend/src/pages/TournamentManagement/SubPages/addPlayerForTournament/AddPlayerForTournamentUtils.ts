import { useMemo } from "react";
import { PlayerData } from "../../../../../types";

export const useColumns = () =>
  useMemo(
    () => [
      {
        key: "name",
        label: "Imie",
      },
      {
        key: "surname",
        label: "Nazwisko",
      },
      {
        key: "birthDate",
        label: "Data urodzenia",
      },
      {
        key: "school",
        label: "Szkoła",
      },
      {
        key: "actions",
        label: "Akcje",
      },
    ],
    []
  );

export const useMemorizedPlayers = (players: PlayerData[] | undefined) =>
  useMemo(
    () =>
      players?.map((player, i) => ({
        ...player,
        lp: i + 1,
        id: player?.playerId,
        school: player.class?.school?.name,
        birthDate: player.birthDate.toLocaleDateString(),
      })) || [],
    [players]
  );
