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

type AddGokartModalProps = {
  modalProps: ModalProps;
};

export const AddGokartModal: FC<AddGokartModalProps> = ({ modalProps }) => {
  const [gokart, setGokart] = useState<string>("");
  const { mutateAsync: createGokart } = GokartQueries.createGokart();
  useEffect(() => {
    setGokart("");
  }, [modalProps.isOpen]);

  return (
    <Modal {...modalProps} key={modalProps.isOpen ? "add-open" : "add-close"}>
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
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
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
