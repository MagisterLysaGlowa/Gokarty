import { useState } from "react";
// import "./AddGokart.css";
import { GokartData } from "../../../types";
import { resetGokartValues } from "./AddGokartUtils";
import { GokartQueries } from "../../queries/gokartQuery";
import {
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
import { defaultVariant } from "../../Utils/gloablUtils";

export const AddGokart = () => {
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
                  variant={defaultVariant}
                />
                <Input
                  label="Password"
                  placeholder="Enter your password"
                  type="password"
                  variant={defaultVariant}
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
