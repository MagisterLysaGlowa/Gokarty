import { useEffect, useState } from "react";
// import "./AddGokart.css";
import { GokartData } from "../../../types";
import { handleChange } from "../TournamentEdit/TournamentEditUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useModal } from "../../components/Modal/useModal";
import { buildButton } from "../../components/Modal/Utils";
import { gokartValidate } from "../../validations/GokartValidation";
import { resetGokartValues } from "./AddGokartUtils";
import { GokartQueries } from "../../queries/gokartQuery";
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Checkbox,
  Input,
  Link,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/react";

export const AddGokart = () => {
  const modal = useModal();
  const [gokart, Setgokart] = useState<GokartData>({
    name: "",
    gokartId: -1,
  });

  const { data: allGokarts } = GokartQueries.getAllGokarts();

  const { mutateAsync: createGokart } = GokartQueries.createGokart({
    onSuccess: () => {
      Setgokart(resetGokartValues);
    },
  });

  const { mutateAsync: removeGokart } = GokartQueries.removeGokart();

  const { mutateAsync: updateGokart } = GokartQueries.updateGokart({
    onSuccess: () => {
      Setgokart(resetGokartValues);
    },
  });
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <div className="page">
      <Button color="primary" onPress={onOpen}>
        Open Modal
      </Button>
      <Modal isOpen={isOpen} placement="top-center" onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
              <ModalBody>
                <Input
                  label="Email"
                  placeholder="Enter your email"
                  variant="bordered"
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant="bordered"
                />
                <div className="flex py-2 px-1 justify-between">
                  <Checkbox
                    classNames={{
                      label: "text-small",
                    }}
                  >
                    Remember me
                  </Checkbox>
                  <Link color="primary" href="#" size="sm">
                    Forgot password?
                  </Link>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={onClose}>
                  Sign in
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
