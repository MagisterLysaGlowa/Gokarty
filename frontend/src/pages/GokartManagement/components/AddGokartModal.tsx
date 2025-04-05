import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { GokartData, ModalProps } from "../../../../types";
import { FC, useEffect, useState } from "react";
import { GokartQueries } from "../../../queries/gokartQuery";
import { gokartValidationSchema } from "../../../validations/gokartValidation";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { validateData } from "../../../validations/validationUtils";

type AddGokartModalProps = {
  modal: ModalProps;
};

export const AddGokartModal: FC<AddGokartModalProps> = ({ modal }) => {
  const [gokart, setGokart] = useState<GokartData>({
    name: "",
  });
  const { mutateAsync: createGokart } = GokartQueries.createGokart();

  useEffect(() => {
    setGokart({ name: "" });
  }, [modal.isOpen]);

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
              Dodaj gokart
            </ModalHeader>
            <ModalBody>
              <Input
                label="Nazwa"
                value={gokart.name}
                onValueChange={(e) => setGokart((p) => ({ ...p, name: e }))}
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
                    await createGokart(gokart);
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
