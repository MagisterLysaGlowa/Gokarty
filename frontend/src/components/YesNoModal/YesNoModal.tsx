import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ModalProps } from "../../../types";
import { ReactNode } from "react";
import { modalConfig } from "../../configs/modalConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../configs/buttonConfig";

type YesNoModalProps = {
  modal: ModalProps;
  children: ReactNode;
  onYes: () => void;
  header: string;
  buttonText?: string;
  isFunctionLoading?: boolean;
};

export const YesNoModal: React.FC<YesNoModalProps> = ({
  modal,
  children,
  onYes,
  header,
  buttonText = "Usuń",
  isFunctionLoading = false,
}) => {
  return (
    <Modal
      isOpen={modal.isOpen}
      onOpenChange={modal.onOpenChange}
      {...modalConfig}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>{header}</ModalHeader>
            <ModalBody>{children}</ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                isLoading={isFunctionLoading}
                {...confirmButtonConfig}
                onPress={() => {
                  onYes();
                  onClose();
                }}
              >
                {buttonText}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
