import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ModalProps, SchoolData } from "../../../../types";
import { SchoolQueries } from "../../../queries/schoolQuery";
import { queryClient } from "../../../Utils/ReactQueryConfig";

type RemovePlayersProps = {
  modal: ModalProps;
  school: SchoolData;
};

export const RemoveSchoolsModal: React.FC<RemovePlayersProps> = ({
  modal,
  school,
}) => {
  const { mutateAsync: removeSchool } = SchoolQueries.removeSchool({
    onSuccess: async () =>
      await queryClient.invalidateQueries(["schools"]),
  });

  return (
    <Modal {...modal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Usuwanie szkoły</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <div>{school.name + " (" + school.acronym + ")"}</div>
                <div>{school.city}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await removeSchool(Number(school.schoolId));
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
