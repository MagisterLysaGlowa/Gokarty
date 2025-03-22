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
import { ModalProps } from "../../../../types";
import { GokartRow } from "../AddGokart";
import { GokartQueries } from "../../../queries/gokartQuery";
import { gokartValidate } from "../../../validations/GokartValidation";

type EditGokartModalProps = {
  modalProps: ModalProps;
  gokart: GokartRow;
};

export const EditGokartModal: FC<EditGokartModalProps> = ({
  modalProps: props,
  gokart,
}) => {
  const { isOpen, onOpenChange } = props;
  const [gokartToEdit, setGokartToEdit] = useState<GokartRow>(gokart);
  const { mutateAsync: editGokartAsync } = GokartQueries.updateGokart();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edytuj Gokart
            </ModalHeader>
            <ModalBody>
              <Input
                label="Identyfikator"
                value={`${gokartToEdit?.key}`}
                readOnly
              />
              <Input
                label="Nazwa"
                value={gokartToEdit?.name}
                onValueChange={(e) =>
                  setGokartToEdit((p) => ({ ...p, name: e }))
                }
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  if (
                    await gokartValidate({
                      name: String(gokartToEdit?.name),
                    })
                  ) {
                    await editGokartAsync({
                      gokartId: Number(gokartToEdit?.key),
                      name: String(gokartToEdit?.name),
                    });
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
