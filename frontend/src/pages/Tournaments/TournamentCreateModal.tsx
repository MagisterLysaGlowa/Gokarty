import { ModalProps, TournamentFormData } from "../../../types";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Input,
  DateRangePicker,
  ModalFooter,
  Button,
} from "@heroui/react";
import { tournamentValidate } from "../../validations/TournamentValidation";
import { defaultVariant } from "../../Utils/globalUtils";
import { TournamentQueries } from "../../queries/tournamentQuery";
import { useEffect, useState } from "react";
import { resetTournamentValues } from "./TournamentUtils";
import { modalConfig } from "../../configs/modalConfig";

type TournamentCreateModalParams = {
  modal: ModalProps;
};

export const CreateTournamentModal: React.FC<TournamentCreateModalParams> = ({
  modal,
}) => {
  const [tournament, setTournament] = useState<TournamentFormData>(
    resetTournamentValues
  );

  const { mutateAsync: createTournament } =
    TournamentQueries.createTournament();

  useEffect(() => {
    setTournament(resetTournamentValues);
  }, [modal.isOpen]);

  return (
    <Modal
      isOpen={modal.isOpen}
      onOpenChange={modal.onOpenChange}
      isDismissable={false}
      {...modalConfig}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Dodaj zawody
            </ModalHeader>
            <ModalBody>
              <Input
                label="Nazwa"
                placeholder="Podaj nazwe turnieju"
                value={tournament.name}
                variant={defaultVariant}
                onChange={(e) =>
                  setTournament((prev) => ({ ...prev, name: e.target.value }))
                }
              />
              <DateRangePicker
                label="Czas trwania turnieju"
                onChange={(e) => {
                  if (e?.start && e.end)
                    setTournament((prev) => ({
                      ...prev,
                      startDate: e.start.toDate("Europe/Warsaw"),
                      endDate: e.end.toDate("Europe/Warsaw"),
                    }));
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="warning"
                onPress={async () => {
                  if (await tournamentValidate(tournament)) {
                    await createTournament(tournament);
                    onClose();
                  }
                }}
              >
                Dodaj
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
