import { FC } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import { useNavigate } from "react-router-dom";
import { TournamentQueries } from "../../../../../queries/tournamentQuery";
import { ModalProps, TournamentData } from "../../../../../../types";

type RemoveTournamentProps = {
  modal: ModalProps;
  tournament: TournamentData;
};

export const RemoveTournamentModal: FC<RemoveTournamentProps> = ({
  modal,
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
    <Modal {...modal}>
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
