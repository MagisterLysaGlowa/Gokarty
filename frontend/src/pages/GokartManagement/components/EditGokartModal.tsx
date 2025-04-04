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
import { gokartValidate } from "../../../validations/GokartValidation";

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
    <Modal isOpen={modal.isOpen} onOpenChange={modal.onOpenChange}>
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
                      gokartId: Number(gokartToEdit?.gokartId),
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
