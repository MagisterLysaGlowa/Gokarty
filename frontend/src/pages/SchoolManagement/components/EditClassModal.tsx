import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { ClassData, ModalProps } from "../../../../types";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { validateData } from "../../../validations/validationUtils";
import { ClassQueries } from "../../../queries/classQuery";
import { classValidationSchema } from "../../../validations/ClassValidation";

type EditModalProps = {
  modal: ModalProps;
  _class: ClassData;
};

export const EditClassModal: React.FC<EditModalProps> = ({
  modal,
  _class,
}) => {
  const [classToEdit, setClassToEdit] = useState<ClassData>(_class);
  const { mutateAsync: updateClass } = ClassQueries.updateClass();

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
              Edytuj klasę
            </ModalHeader>
            <ModalBody>
              <Input
                disabled
                value={String(_class.classId)}
                readOnly
                label="Identyfikator klasy"
                {...inputConfig}
              />
              <Input
                value={classToEdit.name}
                label="Nazwa"
                onValueChange={(e) =>
                  setClassToEdit((prev) => ({ ...prev, name: e }))
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
                  if (
                    await validateData(classValidationSchema, classToEdit)
                  ) {
                    await updateClass(classToEdit);
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
