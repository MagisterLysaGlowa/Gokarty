import { Button, useDisclosure } from "@heroui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { TournamentData, TournamentType } from "../../../../../types";
import { TournamentQueries } from "../../../../queries/tournamentQuery";
import { RemoveTournamentModal } from "./tournamentInfoComponents/RemoveTournamentModal";
import { EditTournamentModal } from "./tournamentInfoComponents/EditTournamentModal";
import "../../tournamentEdit.css";
import { TournamentInfoComponent } from "./tournamentInfoComponents/TournamentInfoComponent";

export const TournamentInfo = () => {
  const { id } = useParams();

  const editModal = useDisclosure();
  const removeModal = useDisclosure();

  const [tournament, SetTournament] = useState<TournamentData>({
    endDate: new Date(),
    startDate: new Date(),
    name: "",
    tournamentId: -1,
    tournamentStateId: -1,
    tournamentType: {} as TournamentType,
    tournamentTypeId: -1,
  });

  const { isLoading } = TournamentQueries.getTournament(Number(id), {
    onSuccess: (res) => SetTournament(res),
  });

  return (
    <div className="grid place-items-center h-full">
      <TournamentInfoComponent
        tournament={tournament}
        isLoading={isLoading}
        key={id}
      />
      <div className="adminActions">
        <Button
          className="tournamentButton bg-main-default"
          onPress={() => editModal.onOpen()}
          endContent={<FaEdit />}
          isIconOnly
        />
        <Button
          isIconOnly
          endContent={<FaTrash />}
          className="tournamentButton bg-red-600"
          onPress={() => removeModal.onOpen()}
        />
        <Button
          isIconOnly
          endContent={<FaTrash />}
          className="tournamentButton bg-red-600"
          onPress={() => removeModal.onOpen()}
        />
      </div>
      <RemoveTournamentModal
        modal={removeModal}
        tournament={tournament}
      />
      <EditTournamentModal
        modal={editModal}
        tournament={tournament}
        setTournament={SetTournament}
      />
    </div>
  );
};
