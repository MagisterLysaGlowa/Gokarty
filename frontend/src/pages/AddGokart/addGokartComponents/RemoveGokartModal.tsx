import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { FC } from "react";
import { GokartData, ModalProps } from "../../../../types";
import { GokartQueries } from "../../../queries/gokartQuery";

type RemoveGokartProps = {
  modal: ModalProps;
  gokart: GokartData;
};

export const RemoveGokartModal: FC<RemoveGokartProps> = ({
  modal,
  gokart,
}) => {
  const { mutateAsync: removeGokartAsync } = GokartQueries.removeGokart();

  return (
    <Modal {...modal}>
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
                  await removeGokartAsync(gokart.gokartId);
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
