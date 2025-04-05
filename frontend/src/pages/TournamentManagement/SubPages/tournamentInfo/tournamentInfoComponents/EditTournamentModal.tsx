import {
  Button,
  DateRangePicker,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import { parseDate } from "@internationalized/date";
import { TournamentQueries } from "../../../../../queries/tournamentQuery";

import { ModalProps, TournamentData } from "../../../../../../types";
import { modalConfig } from "../../../../../configs/modalConfig";
import { inputConfig } from "../../../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../../../configs/buttonConfig";
import { selectConfig } from "../../../../../configs/selectConfig";
import { dateRangePickerConfig } from "../../../../../configs/dateRangePickerConfig";
import { useState } from "react";

type EditModalProps = {
  modal: ModalProps;
  tournament: TournamentData;
};

export const EditTournamentModal: React.FC<EditModalProps> = ({
  modal,
  tournament,
}) => {
  const [tournamentToEdit, setTournamentToEdit] = useState<TournamentData>(tournament);
  const { mutateAsync: updateTournamentAsync } = TournamentQueries.updateTournament();

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
              Edytuj dane turnieju
            </ModalHeader>
            <ModalBody>
              <Input
                label="Nazwa"
                value={tournamentToEdit.name}
                onChange={(e) =>
                  setTournamentToEdit((p) => ({ ...p, name: e.target.value }))
                }
                {...inputConfig}
              />
              <DateRangePicker
                {...dateRangePickerConfig}
                defaultValue={{
                  start: parseDate(
                    tournamentToEdit.startDate.toISOString().split("T")[0]
                  ),
                  end: parseDate(
                    tournamentToEdit.endDate.toISOString().split("T")[0]
                  ),
                }}
                label="Czas trwania"
              />
              <Select
                {...selectConfig}
                label="Rodzaj kolejki"
                selectedKeys={tournamentToEdit.tournamentTypeId.toString()}
                selectionMode="single"
                onChange={(e) =>
                  setTournamentToEdit((p) => ({
                    ...p,
                    tournamentTypeId: Number(e.target.value),
                  }))
                }
              >
                <SelectItem key={"1"}>Zapętlona</SelectItem>
                <SelectItem key={"2"}>Nieskończona</SelectItem>
              </Select>
              <Select
                {...selectConfig}
                label="Etap turnieju"
                selectionMode="single"
                selectedKeys={[tournamentToEdit.tournamentStateId.toString()]}
                onChange={(e) =>
                  setTournamentToEdit((p) => ({
                    ...p,
                    tournamentStateId: Number(e.target.value),
                  }))
                }
              >
                <SelectItem key={"1"}>Zaplanowane</SelectItem>
                <SelectItem key={"2"}>W trakcie</SelectItem>
                <SelectItem key={"3"}>Zakończone</SelectItem>
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                {...confirmButtonConfig}
                onPress={async () => {
                  if (await tournamentValidate(tournament)) {
                    await updateTournamentAsync(tournament);
                    onClose();
                  }
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
