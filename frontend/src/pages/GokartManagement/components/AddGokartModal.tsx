import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@heroui/react";
import { GokartData, ModalProps } from "../../../../types";
import { FC, useEffect, useRef, useState } from "react";
import { GokartQueries } from "../../../queries/gokartQuery";
import { gokartValidationSchema } from "../../../validations/gokartValidation";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { validateData } from "../../../validations/validationUtils";
import { validateImageFile } from "../../../validations/ImageFileValidation";
import { IoCloseCircleOutline } from "react-icons/io5";

type AddGokartModalProps = {
  modal: ModalProps;
};

export const AddGokartModal: FC<AddGokartModalProps> = ({ modal }) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [gokart, setGokart] = useState<GokartData>({
    name: "",
  });
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const { mutateAsync: createGokart } = GokartQueries.createGokart();

  useEffect(() => {
    setGokart({ name: "" });
    setImage(undefined);
    setImagePreview(undefined);
  }, [modal.isOpen]);

  const fileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(file && validateImageFile(file)) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

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
              Dodaj gokart
            </ModalHeader>
            <ModalBody>
              <Input
                label="Nazwa"
                value={gokart.name}
                onValueChange={(e) => setGokart((p) => ({ ...p, name: e }))}
                {...inputConfig}
              />
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={fileChange}
                ref={fileInput}
                className="hidden"
                />
              <Button onPress={() => fileInput.current?.click()}>
                {image ? "Zmień zdjęcie" : "Dodaj zdjęcie"}
              </Button>
              {imagePreview && (
                <div className="relative flex items-center justify-center">
                  <img 
                    src={imagePreview} 
                    alt="Podgląd wybranego zdjęcia"
                    className="rounded-xl max-h-[500px]"
                  />
                  <Button
                    onPress={() => {
                      setImage(undefined);
                      setImagePreview(undefined);
                    }}
                    isIconOnly
                    className="absolute right-1 top-1 rounded-full text-3xl">
                    <IoCloseCircleOutline />
                  </Button>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                {...confirmButtonConfig}
                onPress={async () => {
                  if (await validateData(gokartValidationSchema, gokart)) {
                    await createGokart({gokart, image});
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
