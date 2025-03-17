import { MutateFunction } from "react-query";
import { TournamentData, TournamentFormData } from "../../../types";
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
import { defaultVariant } from "../../Utils/gloablUtils";

type TournamentCreateModalParams = {
  tournament: TournamentFormData;
  setTournament: React.Dispatch<React.SetStateAction<TournamentFormData>>;
  isOpen: boolean;
  onOpenChange: () => void;
  createTournamentAsync: MutateFunction<
    TournamentData,
    Error,
    TournamentFormData
  >;
};

export const CreateTournamentModal: React.FC<TournamentCreateModalParams> = ({
  isOpen,
  onOpenChange,
  setTournament,
  tournament,
  createTournamentAsync,
}) => {
  const handleSubmit = async (onClose: () => void) => {
    if (await tournamentValidate(tournament)) {
      await createTournamentAsync(tournament);
      onClose();
    }
  };

  const handleCancel = (onClose: () => void) => {
    console.log("Cancel");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      backdrop="blur"
      isDismissable={false}
      placement="top-center"
      onOpenChange={onOpenChange}
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
              <Button
                color="danger"
                variant="light"
                onPress={() => handleCancel(onClose)}
              >
                Anuluj
              </Button>
              <Button
                color="warning"
                onPress={async () => await handleSubmit(onClose)}
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
