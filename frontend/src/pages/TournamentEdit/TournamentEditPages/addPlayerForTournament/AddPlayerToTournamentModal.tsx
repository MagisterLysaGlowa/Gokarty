import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@heroui/react";
import { PlayerQueries } from "../../../../queries/playerQuery";
import { PlayerWithSchoolData } from "../../../../../types";
import { useParams } from "react-router-dom";

type ModalTypeProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  player: PlayerWithSchoolData;
};

export const AddPlayerToTournamentModal: React.FC<ModalTypeProps> = ({
  isOpen,
  onOpenChange,
  player,
}) => {
  const { mutateAsync: addPlayer } = PlayerQueries.addPlayerToTournament();
  const { id } = useParams();
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Dodaj zawodnika
            </ModalHeader>
            <ModalBody>
              <h2>Czy napewno chcesz dodać zawodnika</h2>
              <span>
                {player?.name} {player?.surname}?
              </span>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Nie
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await addPlayer({
                    playerId: player?.playerId,
                    tournamentId: Number(id),
                  });
                  onClose();
                }}
              >
                Tak
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
