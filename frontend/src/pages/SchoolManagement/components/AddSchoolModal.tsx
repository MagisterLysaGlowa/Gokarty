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
import { ModalProps, SchoolFormData } from "../../../../types";
import { SchoolQueries } from "../../../queries/schoolQuery";
import { schoolValidate } from "../../../validations/SchoolValidation";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";

type AddSchoolModalProps = {
  modal: ModalProps;
};

export const AddSchoolModal: React.FC<AddSchoolModalProps> = ({ modal }) => {
  const [school, setSchool] = useState<SchoolFormData>({
    name: "",
    acronym: "",
    city: "",
  });

  const { mutateAsync: createSchool } = SchoolQueries.createSchool();

  useEffect(() => {
    setSchool({
      name: "",
      acronym: "",
      city: "",
    });
  }, [modal.isOpen]);

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
              Dodaj szkołę
            </ModalHeader>
            <ModalBody>
              <Input
                value={school.name}
                label="Nazwa"
                onValueChange={(e) => setSchool((p) => ({ ...p, name: e }))}
                {...inputConfig}
              />
              <Input
                value={school.city}
                label="Miasto"
                onValueChange={(e) => setSchool((p) => ({ ...p, city: e }))}
                {...inputConfig}
              />
              <Input
                value={school.acronym}
                label="Skrót"
                onValueChange={(e) => setSchool((p) => ({ ...p, acronym: e }))}
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
                  if (await schoolValidate(school)) {
                    await createSchool(school);
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
