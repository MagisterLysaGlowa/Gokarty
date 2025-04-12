import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Textarea,
} from "@heroui/react";
import { FC, useEffect, useRef, useState } from "react";
import { GokartData, ModalProps } from "../../../../types";
import { GokartQueries } from "../../../queries/gokartQuery";
import { modalConfig } from "../../../configs/modalConfig";
import { inputConfig } from "../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../configs/buttonConfig";
import { validateData } from "../../../validations/validationUtils";
import { gokartValidationSchema } from "../../../validations/GokartValidation";
import { allowedExtensions } from "../../../validations/ImageFileValidation";
import { fileChange } from "../../../Utils/globalUtils";
import { IoCloseCircleOutline } from "react-icons/io5";

type EditGokartModalProps = {
  modal: ModalProps;
  gokart: GokartData;
};

export const EditGokartModal: FC<EditGokartModalProps> = ({
  modal,
  gokart,
}) => {
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [gokartToEdit, setGokartToEdit] = useState<GokartData>(gokart);
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imagePreview, setImagePreview] = useState<string | undefined>(undefined);
  const { mutateAsync: editGokartAsync } = GokartQueries.updateGokart();

  useEffect(() => {
    setGokartToEdit(gokart)
    setImage(undefined);
    setImagePreview(undefined);
  }, [gokart]);

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
              Edytuj Gokart
            </ModalHeader>
            <ModalBody>
              <Input
                label="Identyfikator"
                value={`${gokartToEdit?.gokartId}`}
                readOnly
                {...inputConfig}
              />
              <Input
                label="Nazwa"
                value={gokartToEdit?.name}
                onValueChange={(e) =>
                  setGokartToEdit((p) => ({ ...p, name: e }))
                }
                {...inputConfig}
              />
              <Textarea
                label="Opis"
                value={gokartToEdit.description}
                onValueChange={(e) => setGokartToEdit((p) => ({ ...p, description: e }))}
                {...inputConfig}
              />
              <input
                type="file"
                accept={allowedExtensions.join(',')}
                onChange={(e) => fileChange(e, setImage, setImagePreview)}
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
                    className="rounded-xl max-h-[400px]"
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
                    console.log(gokartToEdit);
                    
                    await editGokartAsync({gokart: gokartToEdit, image});
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
