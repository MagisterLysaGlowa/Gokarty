import { ModalProps, TournamentData } from "../../../../types";
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
import { useEffect, useState } from "react";
import { tournamentDefaultValue } from "../TournamentUtils";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { dateRangePickerConfig } from "../../../configs/dateRangePickerConfig";
import { TournamentQueries } from "../../../queries/tournamentQuery";
import { defaultVariant } from "../../../Utils/globalUtils";
import { tournamentValidateSchema } from "../../../validations/TournamentValidation";
import { validateData } from "../../../validations/validationUtils";
import { now } from "@internationalized/date";
import { removeSecondsAndMiliseconds } from "../../../Utils/TimeUtils";

type TournamentCreateModalParams = {
  modal: ModalProps;
};

export const CreateTournamentModal: React.FC<TournamentCreateModalParams> = ({
  modal,
}) => {
  const [tournament, setTournament] = useState<TournamentData>(tournamentDefaultValue);
  const { mutateAsync: createTournament } = TournamentQueries.createTournament();

  useEffect(() => {
    setTournament(tournamentDefaultValue);
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
                {...inputConfig}
              />
              <DateRangePicker
                {...dateRangePickerConfig}
                hideTimeZone
                label="Czas trwania turnieju"
                defaultValue={{start: now("Europe/Warsaw"), end: now("Europe/Warsaw")}}
                onChange={(e) => {
                  if (e?.start && e.end)
                    setTournament((prev) => ({
                      ...prev,
                      startDate: removeSecondsAndMiliseconds(e.start.toDate()),
                      endDate: removeSecondsAndMiliseconds(e.end.toDate()),
                    }));
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                {...confirmButtonConfig}
                onPress={async () => {
                  if (
                    await validateData(tournamentValidateSchema, tournament)
                  ) {
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
