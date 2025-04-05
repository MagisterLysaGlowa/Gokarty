import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { FC, useState } from "react";
import { GokartData, ModalProps } from "../../../../types";
import { GokartQueries } from "../../../queries/gokartQuery";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { validateData } from "../../../validations/validationUtils";
import { gokartValidationSchema } from "../../../validations/gokartValidation";

type EditGokartModalProps = {
  modal: ModalProps;
  gokart: GokartData;
};

export const EditGokartModal: FC<EditGokartModalProps> = ({
  modal,
  gokart,
}) => {
  const [gokartToEdit, setGokartToEdit] = useState<GokartData>(gokart);
  const { mutateAsync: editGokartAsync } = GokartQueries.updateGokart();

  return (
    <Modal
      isOpen={modal.isOpen}
      onOpenChange={modal.onOpenChange}
      {...modalConfig}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edytuj Gokart
            </ModalHeader>
            <ModalBody>
              <Input
                label="Identyfikator"
                value={`${gokartToEdit?.gokartId}`}
                readOnly
                {...inputConfig}
              />
              <Input
                label="Nazwa"
                value={gokartToEdit?.name}
                onValueChange={(e) =>
                  setGokartToEdit((p) => ({ ...p, name: e }))
                }
                {...inputConfig}
              />
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                {...confirmButtonConfig}
                onPress={async () => {
                  if (await validateData(gokartValidationSchema, gokart)) {
                    await editGokartAsync(gokartToEdit);
                    onClose();
                  }
                }}
              >
                Edytuj
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
