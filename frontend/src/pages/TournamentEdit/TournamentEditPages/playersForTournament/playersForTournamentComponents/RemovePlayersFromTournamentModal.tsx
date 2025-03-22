import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ModalProps, PlayerWithSchoolData } from "../../../../../../types";
import { queryClient } from "../../../../../Utils/ReactQueryConfig";
import { PlayerQueries } from "../../../../../queries/playerQuery";
import { useParams } from "react-router-dom";

type RemovePlayersProps = {
  removeModal: ModalProps;
  player: PlayerWithSchoolData;
};

export const RemovePlayersFromTournamentModal: React.FC<RemovePlayersProps> = ({
  removeModal,
  player,
}) => {
  const { isOpen, onOpenChange } = removeModal;
  const { id: tournamentId } = useParams();

  const { mutateAsync: removePlayerFromTournament } = PlayerQueries.removePlayerFromTournament({
    onSuccess: async () =>
      await queryClient.invalidateQueries(["playerstournamentwithSchool", tournamentId]),
  });

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Usuwanie gracza z turnieju</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <div>{player.name + " " + player.surname}</div>
                <div>{player.birthDate.toLocaleDateString()}</div>
                <div>{player.school.acronym}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await removePlayerFromTournament({tournamentId: Number(tournamentId), playerId: Number(player.playerId)});
                  onClose();
                }}
              >
                Usuń
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
