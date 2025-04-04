import { useMemo } from "react";
import { PlayerData } from "../../../../../types";

export const useColumns = () => useMemo(
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
  useMemo(() => players?.map((player, i) => ({
    lp: (i + 1).toString(),
    id: player.playerId.toString(),
    name: player.name,
    surname: player.surname,
    birthDate: player.birthDate.toLocaleDateString(),
    school: player.school.acronym
  })) || [], [players]);