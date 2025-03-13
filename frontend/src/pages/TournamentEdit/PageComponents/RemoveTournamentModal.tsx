import { FC } from "react";
import { TournamentQueries } from "../../../queries/tournamentQuery";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { TournamentData } from "../../../../types";
import { useNavigate } from "react-router-dom";

type ModalProsp = {
  isOpen: boolean;
  onOpenChange: () => void;
  tournament: TournamentData;
};

export const RemoveTournamentModal: FC<ModalProsp> = ({
  isOpen,
  onOpenChange,
  tournament,
}) => {
  const navigate = useNavigate();
  const { mutateAsync: removeTournamentAsync } =
    TournamentQueries.removeTournament({
      onSuccess: () => navigate(-1),
    });

  const handleRemove = async (onClose: () => void) => {
    if (tournament.tournamentId) {
      await removeTournamentAsync(tournament.tournamentId);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {tournament.name}
            </ModalHeader>
            <ModalBody>Czy napewno chcesz usunąć te zawody?</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Nie
              </Button>
              <Button
                className="bg-main-default"
                onPress={() => handleRemove(onClose)}
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
