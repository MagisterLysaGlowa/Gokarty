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
import { ModalProps, SchoolData } from "../../../../types";
import { SchoolQueries } from "../../../queries/schoolQuery";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { validateData } from "../../../validations/validationUtils";
import { schoolValidationSchema } from "../../../validations/SchoolValidation";

type EditModalProps = {
  modal: ModalProps;
  school: SchoolData;
};

export const EditSchoolModal: React.FC<EditModalProps> = ({
  modal,
  school,
}) => {
  const [schoolToEdit, setSchoolToEdit] = useState<SchoolData>(school);
  const { mutateAsync: updateSchool, isLoading } = SchoolQueries.updateSchool();

  useEffect(() => {
    setSchoolToEdit(school);
  }, [school]);

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
              Edytuj szkołę
            </ModalHeader>
            <ModalBody>
              <Input
                disabled
                value={String(school.schoolId)}
                readOnly
                label="Identyfikator szkoły"
                {...inputConfig}
              />
              <Input
                value={schoolToEdit.name}
                label="Nazwa"
                onValueChange={(e) =>
                  setSchoolToEdit((prev) => ({ ...prev, name: e }))
                }
                {...inputConfig}
              />
              <Input
                value={schoolToEdit.city}
                label="Miasto"
                onValueChange={(e) =>
                  setSchoolToEdit((prev) => ({ ...prev, city: e }))
                }
                {...inputConfig}
              />
              <Input
                value={schoolToEdit.acronym}
                label="Skrót"
                onValueChange={(e) =>
                  setSchoolToEdit((prev) => ({ ...prev, acronym: e }))
                }
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
                  if (
                    await validateData(schoolValidationSchema, schoolToEdit)
                  ) {
                    await updateSchool(schoolToEdit);
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
