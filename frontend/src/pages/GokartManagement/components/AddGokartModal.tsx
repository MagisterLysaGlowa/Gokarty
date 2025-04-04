import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { ModalProps } from "../../../../types";
import { FC, useEffect, useState } from "react";
import { GokartQueries } from "../../../queries/gokartQuery";
import { gokartValidate } from "../../../validations/GokartValidation";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";

type AddGokartModalProps = {
  modal: ModalProps;
};

export const AddGokartModal: FC<AddGokartModalProps> = ({ modal }) => {
  const [gokart, setGokart] = useState<string>("");
  const { mutateAsync: createGokart } = GokartQueries.createGokart();
  useEffect(() => {
    setGokart("");
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
                value={gokart}
                onValueChange={(e) => setGokart(e)}
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
                  if (await gokartValidate({ name: gokart })) {
                    await createGokart({ name: gokart });
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
