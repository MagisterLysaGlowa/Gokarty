import { Button, useDisclosure } from "@heroui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { EditTournamentModal } from "../PageComponents/EditTournamentModal";
import { TournamentQueries } from "../../../queries/tournamentQuery";
import { useParams } from "react-router-dom";
import { TournamentData, TournamentType } from "../../../../types";
import { useState } from "react";
import { RemoveTournamentModal } from "../PageComponents/RemoveTournamentModal";

export const TournamentInfo = () => {
  const { id } = useParams();

  const [tournament, SetTournament] = useState<TournamentData>({
    endDate: new Date(),
    startDate: new Date(),
    name: "",
    tournamentId: -1,
    tournamentStateId: -1,
    tournamentType: {} as TournamentType,
    tournamentTypeId: -1,
  });

  // const { isLoading } = TournamentQueries.getTournament(Number(id), {
  //   onSuccess: (res) => {
  //     SetTournament(res);
  //   },
  // });

  // const { data: tournamentPlayers, isLoading: tournamentPlayersLoading } =
  //   PlayerQueries.getPlayersForTournamentWithSchool(Number(id));

  // const { mutate: deletePlayerFromTournament } =
  //   PlayerQueries.removePlayerFromTournament();

  TournamentQueries.getTournament(Number(id), {
    onSuccess: (res) => {
      SetTournament(res);
    },
  });

  const {
    isOpen: isEditOpen,
    onOpen: onOpenEdit,
    onOpenChange: onEditOpenChange,
  } = useDisclosure();

  const {
    isOpen: isRemoveOpen,
    onOpen: onRemoveOpen,
    onOpenChange: onRemoveChange,
  } = useDisclosure();

  return (
    <div className="flex flex-col flex-1 items-center justify-center h-full">
      <div className="w-1/3 mx-auto flex flex-col gap-5 text-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-main-default text-center text-4xl">Nazwa</h2>
          <span className="text-xl">{tournament?.name}</span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-main-default text-center text-4xl">
            Data trwania
          </h2>
          <span className="text-xl">
            {tournament?.startDate.toLocaleDateString() +
              " - " +
              tournament?.endDate.toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="text-main-default text-center text-4xl">
            Rodzaj kolejki
          </h2>
          <span>{tournament?.tournamentType?.name}</span>
        </div>
      </div>

      <div className="adminActions">
        <Button
          className="tournamentButton bg-main-default"
          onPress={() => onOpenEdit()}
          endContent={<FaEdit />}
          isIconOnly
        />
        <Button
          isIconOnly
          endContent={<FaTrash />}
          className="tournamentButton bg-red-600"
          onPress={() => onRemoveOpen()}
        />
      </div>
      <RemoveTournamentModal
        isOpen={isRemoveOpen}
        onOpenChange={onRemoveChange}
        tournament={tournament}
      />
      <EditTournamentModal
        isOpen={isEditOpen}
        onOpenChange={onEditOpenChange}
        tournament={tournament}
        setTournament={SetTournament}
      />
    </div>
  );
};
