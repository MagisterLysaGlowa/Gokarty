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
import { ModalProps, SchoolData, SchoolFormData } from "../../../../types";
import { SchoolQueries } from "../../../queries/schoolQuery";
import { queryClient } from "../../../Utils/ReactQueryConfig";
import { schoolValidate } from "../../../validations/SchoolValidation";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";

type EditModalProps = {
  modal: ModalProps;
  school: SchoolData;
};

export const EditSchoolModal: React.FC<EditModalProps> = ({
  modal,
  school,
}) => {
  const [schoolToEdit, setSchoolToEdit] = useState<SchoolFormData>(school);

  const { mutateAsync: updateSchool } = SchoolQueries.updateSchool({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["schools", Number(school.schoolId)]);
    },
  });

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
                label="Identyfikator przejazdu"
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
                {...confirmButtonConfig}
                onPress={async () => {
                  if (await schoolValidate(schoolToEdit)) {
                    await updateSchool({
                      schoolId: Number(school.schoolId),
                      data: schoolToEdit,
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
