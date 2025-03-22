import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { FC } from "react";
import { ModalProps } from "../../../../types";
import { GokartRow } from "../AddGokart";
import { GokartQueries } from "../../../queries/gokartQuery";

type RemoveGokartProps = {
  modalProps: ModalProps;
  gokart: GokartRow;
};

export const RemoveGokartModal: FC<RemoveGokartProps> = ({
  modalProps,
  gokart,
}) => {
  const { isOpen, onOpenChange } = modalProps;

  const { mutateAsync: removeGokartAsync } = GokartQueries.removeGokart();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Usuń gokart
            </ModalHeader>
            <ModalBody>{gokart.name}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await removeGokartAsync(gokart.key);
                  onClose();
                }}
              >
                Usuń
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
