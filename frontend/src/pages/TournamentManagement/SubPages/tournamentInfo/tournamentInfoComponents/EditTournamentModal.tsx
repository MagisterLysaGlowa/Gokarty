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
import { useEffect, useRef, useState } from "react";
import { validateData } from "../../../../../validations/validationUtils";
import { tournamentValidateSchema } from "../../../../../validations/TournamentValidation";
import { removeSecondsAndMiliseconds } from "../../../../../Utils/TimeUtils";
import { fromDate, getLocalTimeZone } from "@internationalized/date";
import { allowedExtensions } from "../../../../../validations/ImageFileValidation";
import { fileChange } from "../../../../../Utils/globalUtils";
import { IoCloseCircleOutline } from "react-icons/io5";

type EditModalProps = {
  modal: ModalProps;
  tournament: TournamentData;
};

export const EditTournamentModal: React.FC<EditModalProps> = ({
  modal,
  tournament,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [tournamentToEdit, setTournamentToEdit] =
    useState<TournamentData>(tournament);
  const { mutateAsync: updateTournamentAsync, isLoading } =
    TournamentQueries.updateTournament();
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(
    undefined
  );

  useEffect(() => {
    setTournamentToEdit(tournament);
    setImage(undefined);
    setImagePreview(undefined);
  }, [tournament]);

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
                hideTimeZone
                defaultValue={{
                  start: fromDate(
                    tournamentToEdit.startDate,
                    getLocalTimeZone()
                  ),
                  end: fromDate(tournamentToEdit.endDate, getLocalTimeZone()),
                }}
                onChange={(e) => {
                  if (e?.start && e.end)
                    setTournamentToEdit((prev) => ({
                      ...prev,
                      startDate: removeSecondsAndMiliseconds(e.start.toDate()),
                      endDate: removeSecondsAndMiliseconds(e.end.toDate()),
                    }));
                }}
                label="Czas trwania"
              />
              <Select
                {...selectConfig}
                label="Rodzaj kolejki"
                selectedKeys={[tournamentToEdit.tournamentTypeId.toString()]}
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
              <input
                type="file"
                accept={allowedExtensions.join(",")}
                onChange={(e) => fileChange(e, setImage, setImagePreview)}
                ref={fileInput}
                className="hidden"
              />
              <Button onPress={() => fileInput.current?.click()}>
                {image ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
              </Button>
              {imagePreview && (
                <div className="relative flex items-center justify-center">
                  <img
                    src={imagePreview}
                    alt="Podgląd wybranego zdjęcia"
                    className="rounded-xl max-h-[400px]"
                  />
                  <Button
                    onPress={() => {
                      setImage(undefined);
                      setImagePreview(undefined);
                    }}
                    isIconOnly
                    className="absolute right-1 top-1 rounded-full text-3xl"
                  >
                    <IoCloseCircleOutline />
                  </Button>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                isLoading={isLoading}
                {...confirmButtonConfig}
                onPress={async () => {
                  if (
                    await validateData(
                      tournamentValidateSchema,
                      tournamentToEdit
                    )
                  ) {
                    await updateTournamentAsync({
                      tournament: tournamentToEdit,
                      image,
                    });
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
