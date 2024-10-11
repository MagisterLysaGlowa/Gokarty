import { PlayerData } from "../../../types";
import { queryClient } from "../../Utils/ReactQueryConfig";

export const resetPlayerValues: PlayerData = {
  playerId: -1,
  birthDate: new Date(),
  name: "",
  schoolId: -1,
  surname: "",
};

export const removePlayerFromList = (removeId: number) => {
  queryClient.setQueryData(
    "tournamentPlayers",
    (prev: PlayerData[] | undefined) => {
      return prev ? prev.filter((player) => player.playerId != removeId) : [];
    }
  );
};
