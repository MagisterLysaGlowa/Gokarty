import { Button, useDisclosure } from "@heroui/react";
import { FaDice, FaEdit, FaList, FaPlay, FaStop, FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { TournamentData, TournamentType } from "../../../../../types";
import { TournamentQueries } from "../../../../queries/tournamentQuery";
import { EditTournamentModal } from "./tournamentInfoComponents/EditTournamentModal";
import "../../tournamentEdit.css";
import { TournamentInfoComponent } from "./tournamentInfoComponents/TournamentInfoComponent";
import { Loading } from "../../../../components/Loading/Loading";
import { CreateQueueModal } from "./tournamentInfoComponents/CreateQueueModal";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { Tooltip } from "@heroui/tooltip";
import { QueueQueries } from "../../../../queries/queueQuery";

export const TournamentInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editModal = useDisclosure();
  const removeModal = useDisclosure();
  const queueModal = useDisclosure();
  const startEndModal = useDisclosure();

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

  const { mutateAsync: removeTournamentAsync } =
    TournamentQueries.removeTournament({
      onSuccess: () => navigate(-1),
    });

  const { mutateAsync: updateTournament } =
    TournamentQueries.updateTournament();

  const { data: queue } = QueueQueries.getAllFullQueuesForTournament(
    Number(id), { enabled: tournament.tournamentStateId == 2 }
  );

  return (
    <div className="grid place-items-center h-full">
      {isLoading ? 
      <Loading isLoading={isLoading}/> : 
      <>
        <TournamentInfoComponent
          tournament={tournament}
          isLoading={isLoading}
          key={id}
        />
        <div className="adminActions">
          <Tooltip content="Edytuj zawody" showArrow>
            <Button
              className="tournamentButton bg-main-default"
              onPress={() => editModal.onOpen()}
              endContent={<FaEdit />}
              isIconOnly
            />
          </Tooltip>
          <Tooltip content="Usuń zawody" showArrow>
            <Button
              isIconOnly
              endContent={<FaTrash />}
              className="tournamentButton bg-red-600"
              onPress={() => removeModal.onOpen()}
            />
          </Tooltip>
          {tournament.tournamentStateId != 3 &&
          <Tooltip content={tournament.tournamentStateId == 1 ? "Rozpocznij zawody" : "Zakończ zawody"} showArrow>
            <Button
              isIconOnly
              endContent={tournament.tournamentStateId == 1 ? <FaPlay /> : <FaStop />}
              className="tournamentButton bg-blue-600"
              onPress={() => startEndModal.onOpen()}
            />
          </Tooltip>}
          {tournament.tournamentStateId == 2 &&
          <Tooltip content="Wylosuj kolejke" showArrow>
            <Button
                isIconOnly
                endContent={
                  !queue || queue.length == 0 ? <FaDice /> : <FaList />
                }
                className={`tournamentButton ${
                  !queue || queue.length == 0 ? "bg-orange-600" : "bg-green-700"
                }`}
                onPress={() => {
                  if (!queue || queue.length == 0) queueModal.onOpen();
                  else navigate(`/zawody/${Number(id)}/kolejka`);
                }}
              />
          </Tooltip>}
        </div>
        <YesNoModal
          header={tournament.name}
          modal={removeModal}
          onYes={async () => removeTournamentAsync(Number(tournament.tournamentId))}
          key={`remove-${tournament.tournamentId}`}
        >
          {"Czy napewno chcesz usunąć te zawody?"}
        </YesNoModal>
        <EditTournamentModal
          modal={editModal}
          tournament={tournament}
          setTournament={SetTournament}
          key={`edit-${tournament.tournamentId}`}
        />
        <CreateQueueModal
          tournament={tournament}
          modal={queueModal}
          key={`queue-${tournament.tournamentId}`}
        />
        <YesNoModal
          header={(tournament.tournamentStateId == 1 ? "Rozpoczęcie" : "Zakończnie") + " zawodów"}
          modal={startEndModal}
          buttonText="Tak"
          onYes={async () => updateTournament({...tournament, tournamentStateId: tournament.tournamentStateId + 1})}
          key={`state-${tournament.tournamentId}`}
        >
          Czy napewno chcesz {tournament.tournamentStateId == 1 ? "rozpocząć" : "zakończyć"} te zawody?
        </YesNoModal>
      </>
      }
    </div>
  );
};
