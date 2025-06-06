import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { ClassData, ModalProps, SchoolData } from "../../../../types";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { validateData } from "../../../validations/validationUtils";
import { ClassQueries } from "../../../queries/classQuery";
import { classValidationSchema } from "../../../validations/ClassValidation";

type AddClassModalProps = {
  modal: ModalProps;
  school: SchoolData;
};

export const AddClassModal: React.FC<AddClassModalProps> = ({
  modal,
  school,
}) => {
  const [_class, setClass] = useState<ClassData>({
    name: "",
    schoolId: Number(school.schoolId),
  });

  const { mutateAsync: createClass, isLoading } = ClassQueries.createClass();

  useEffect(() => {
    setClass({
      name: "",
      schoolId: Number(school.schoolId),
    });
  }, [modal.isOpen, school.schoolId]);

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
              Dodaj klasę
            </ModalHeader>
            <ModalBody>
              <Input
                value={school.name}
                label="Szkoła"
                {...inputConfig}
                disabled
                readOnly
              />
              <Input
                value={_class.name}
                label="Nazwa"
                onValueChange={(e) => setClass((c) => ({ ...c, name: e }))}
                {...inputConfig}
              />
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                isLoading={isLoading}
                {...confirmButtonConfig}
                onPress={async () => {
                  if (await validateData(classValidationSchema, _class)) {
                    await createClass(_class);
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
