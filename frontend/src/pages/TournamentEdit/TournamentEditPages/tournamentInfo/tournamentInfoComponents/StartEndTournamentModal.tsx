import { FC } from "react";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

import { ModalProps, TournamentData } from "../../../../../../types";
import { TournamentQueries } from "../../../../../queries/tournamentQuery";

type StartEndTournamentProps = {
  modal: ModalProps;
  tournament: TournamentData;
};

export const StartEndTournamentModal: FC<StartEndTournamentProps> = ({
  modal,
  tournament,
}) => {
  
	const { mutateAsync: updateTournament} = TournamentQueries.updateTournament();

  return (
    <Modal {...modal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              {tournament.tournamentStateId == 1 ? "Rozpoczęcie" : "Zakończnie"} zawodów
            </ModalHeader>
            <ModalBody>Czy napewno chcesz {tournament.tournamentStateId == 1 ? "rozpocząć" : "zakończyć"} te zawody?</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="flat" onPress={onClose}>
                Nie
              </Button>
              <Button
                className="bg-main-default"
                onPress={() => {
									updateTournament({...tournament, tournamentStateId: tournament.tournamentStateId + 1});
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
