import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import { ModalProps, TournamentData } from "../../../../../../types";
import { useState } from "react";
import { GokartQueries } from "../../../../../queries/gokartQuery";
import { QueueQueries } from "../../../../../queries/queueQuery";
import { modalConfig } from "../../../../../configs/modalConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../../../configs/buttonConfig";
import { selectConfig } from "../../../../../configs/selectConfig";
import { validateData } from "../../../../../validations/validationUtils";
import { queueValidationSchema } from "../../../../../validations/queueValidation";

type CreateQueueProps = {
  modal: ModalProps;
  tournament: TournamentData;
  refetchQueue: () => void;
};

export const CreateQueueModal: React.FC<CreateQueueProps> = ({
  modal,
  tournament,
  refetchQueue,
}) => {
  const [numberOfRidesInOneGokart, setNumberOfRidesInOneGokart] = useState<number>(1);
  const [gokartIds, setGokartIds] = useState<number[]>([]);

  const { data: gokarts } = GokartQueries.getAllGokarts();
  const { mutateAsync: createQueuesAsync } = QueueQueries.createQueue({
    onSuccess: () => refetchQueue(),
  });

  if (!gokarts) return;

  return (
    <Modal
      placement="top-center"
      isOpen={modal.isOpen}
      onOpenChange={modal.onOpenChange}
      {...modalConfig}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Wylosuj kolejkę
            </ModalHeader>
            <ModalBody>
              <NumberInput
                min={1}
                type="number"
                label="Ilość przejazdów na gokart"
                value={numberOfRidesInOneGokart}
                onValueChange={setNumberOfRidesInOneGokart}
              />
              <Select
                {...selectConfig}
                label="Wybierz gokarty"
                selectedKeys={gokartIds}
                selectionMode="multiple"
                onSelectionChange={(e) =>
                  setGokartIds(Array.from(e as Set<number>))
                }
              >
                {gokarts.map((g) => (
                  <SelectItem key={g.gokartId}>{g.name}</SelectItem>
                ))}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                {...confirmButtonConfig}
                onPress={async () => {
                  if (
                    await validateData(queueValidationSchema, {
                      gokartIds: gokartIds,
                      numberOfRidesInOneGokart: numberOfRidesInOneGokart,
                      tournamentId: tournament.tournamentId,
                    })
                  ) {
                    await createQueuesAsync({
                      gokartIds: gokartIds,
                      numberOfRidesInOneGokart: numberOfRidesInOneGokart,
                      tournamentId: Number(tournament.tournamentId),
                    });
                  }
                  onClose();
                }}
              >
                Zatwierdź
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
