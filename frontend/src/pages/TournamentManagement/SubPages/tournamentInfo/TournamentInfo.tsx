import { Button, useDisclosure } from "@heroui/react";
import {
  FaDice,
  FaEdit,
  FaPlay,
  FaStop,
  FaTrash,
} from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { TournamentQueries } from "../../../../queries/tournamentQuery";
import { EditTournamentModal } from "./tournamentInfoComponents/EditTournamentModal";
import "../../tournamentEdit.css";
import { TournamentInfoComponent } from "./tournamentInfoComponents/TournamentInfoComponent";
import { CreateQueueModal } from "./tournamentInfoComponents/CreateQueueModal";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { Tooltip } from "@heroui/tooltip";
import { QueueQueries } from "../../../../queries/queueQuery";
import { LoadingWrapper } from "../../../../components/Loading/LoadingWrapper";

export const TournamentInfo = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const editModal = useDisclosure();
  const removeModal = useDisclosure();
  const queueModal = useDisclosure();
  const startEndModal = useDisclosure();

  const { data: tournamentData, isLoading } = TournamentQueries.getTournament(Number(id));

  const { mutateAsync: removeTournamentAsync } =
    TournamentQueries.removeTournament({
      onSuccess: () => navigate(-1),
    });

  const { mutateAsync: updateTournament } = TournamentQueries.updateTournament();

  const { data: queue, refetch: refetchQueue } =
    QueueQueries.getAllFullQueuesForTournament(Number(id), {
      enabled: tournamentData?.tournamentStateId == 2,
    });

  return (
    <div className="flex flex-col items-center h-full">
      <LoadingWrapper data={tournamentData} isLoading={isLoading}>
        {(tournament) => (
          <>
            <TournamentInfoComponent
              tournament={tournament}
              isLoading={isLoading}
              key={id}
            />
            <div className="flex gap-4">
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
              {tournament.tournamentStateId != 3 && (
                <Tooltip
                  content={
                    tournament.tournamentStateId == 1
                      ? "Rozpocznij zawody"
                      : "Zakończ zawody"
                  }
                  showArrow
                >
                  <Button
                    isIconOnly
                    endContent={
                      tournament.tournamentStateId == 1 ? <FaPlay /> : <FaStop />
                    }
                    className="tournamentButton bg-blue-600"
                    onPress={() => startEndModal.onOpen()}
                  />
                </Tooltip>
              )}
              {tournament.tournamentStateId == 2 && !queue?.length && (
                <Tooltip
                  content={"Wylosuj kolejke"}
                  showArrow
                >
                  <Button
                    isIconOnly
                    endContent={<FaDice />}
                    className={`tournamentButton ${!queue?.length ? "bg-orange-600" : "bg-green-700"
                      }`}
                    onPress={queueModal.onOpen}
                  />
                </Tooltip>
              )}
            </div>
            <YesNoModal
              header={tournament.name}
              modal={removeModal}
              onYes={async () => {
                const res = await removeTournamentAsync(Number(tournament.tournamentId));
                if(res.status === 200)
                  navigate("/zawody");
              }
              }
              key={`remove-${tournament.tournamentId}`}
            >
              {"Czy napewno chcesz usunąć te zawody?"}
            </YesNoModal>
            <EditTournamentModal
              modal={editModal}
              tournament={tournament}
              key={`edit-${editModal.isOpen}`}
            />
            <CreateQueueModal
              refetchQueue={refetchQueue}
              tournament={tournament}
              modal={queueModal}
              key={`queue-${tournament.tournamentId}`}
            />
            <YesNoModal
              header={
                (tournament.tournamentStateId == 1
                  ? "Rozpoczęcie"
                  : "Zakończnie") + " zawodów"
              }
              modal={startEndModal}
              buttonText="Tak"
              onYes={async () =>
                updateTournament({tournament: {
                  ...tournament,
                  tournamentStateId: tournament.tournamentStateId + 1
                }})
              }
              key={`state-${tournament.tournamentId}`}
            >
              Czy napewno chcesz{" "}
              {tournament.tournamentStateId == 1 ? "rozpocząć" : "zakończyć"} te
              zawody?
            </YesNoModal>
          </>
        )}
      </LoadingWrapper>
    </div>
  );
};
