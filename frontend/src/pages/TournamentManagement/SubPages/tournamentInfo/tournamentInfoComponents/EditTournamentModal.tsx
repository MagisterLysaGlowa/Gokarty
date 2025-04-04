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
import { tournamentValidate } from "../../../../../validations/TournamentValidation";
import { ModalProps, TournamentData } from "../../../../../../types";
import { modalConfig } from "../../../../../configs/modalConfig";
import { inputConfig } from "../../../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../../../configs/buttonConfig";
import { selectConfig } from "../../../../../configs/selectConfig";
import { dateRangePickerConfig } from "../../../../../configs/dateRangePickerConfig";

type EditModalProps = {
  modal: ModalProps;
  tournament: TournamentData;
  setTournament: React.Dispatch<React.SetStateAction<TournamentData>>;
};

export const EditTournamentModal: React.FC<EditModalProps> = ({
  modal,
  tournament,
  setTournament,
}) => {
  const { mutateAsync: updateTournamentAsync } =
    TournamentQueries.updateTournament();

  const handleEdit = async (onClose: () => void) => {
    if (await tournamentValidate(tournament)) {
      await updateTournamentAsync(tournament);
      onClose();
    }
  };

  const variant = "underlined";

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
                value={tournament.name}
                variant={variant}
                onChange={(e) =>
                  setTournament((p) => ({ ...p, name: e.target.value }))
                }
                {...inputConfig}
              />
              <DateRangePicker
                {...dateRangePickerConfig}
                defaultValue={{
                  start: parseDate(
                    tournament.startDate.toISOString().split("T")[0]
                  ),
                  end: parseDate(
                    tournament.endDate.toISOString().split("T")[0]
                  ),
                }}
                variant={variant}
                label="Czas trwania"
              />
              <Select
                {...selectConfig}
                label="Rodzaj kolejki"
                selectedKeys={tournament.tournamentTypeId.toString()}
                selectionMode="single"
                onChange={(e) =>
                  setTournament((p) => ({
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
                selectedKeys={[tournament.tournamentStateId.toString()]}
                onChange={(e) =>
                  setTournament((p) => ({
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
                onPress={() => handleEdit(onClose)}
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
