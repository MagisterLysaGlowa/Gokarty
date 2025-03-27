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
  
  type YesNoModalProps = {
    modal: ModalProps;
    children: ReactNode;
    onYes: () => void;
    header: string;
    buttonText?: string;
  };
  
  export const YesNoModal: React.FC<YesNoModalProps> = ({
    modal,
    children,
    onYes,
    header,
    buttonText = "Usuń",
  }) => {
    return (
      <Modal {...modal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>{header}</ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Anuluj
                </Button>
                <Button
                  color="primary"
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
  