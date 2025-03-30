import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { FC } from "react";
import { ModalProps } from "../../../../types";
import { TableRowsType } from "../tournamentTableUtils";
type RideInfoModalProps = { modalProps: ModalProps; ride: TableRowsType };
export const RideInfoModal: FC<RideInfoModalProps> = ({ modalProps, ride }) => {
  const { isOpen, onOpenChange } = modalProps;
  const setColorForPosition = (position: number) => {
    if (position === 1) return "text-yellow-500";
    if (position === 2) return "text-gray-500";
    if (position === 3) return "text-amber-900";
    return "text-white";
  }
  const setBorderForPosition = (position: number) => {
    if (position === 1) return "border-yellow-500";
    if (position === 2) return "border-gray-500";
    if (position === 3) return "border-amber-900";
    return "border-none";
  }
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className={`border-2 ${setBorderForPosition(Number(ride.pozycja.substring(1)))}`}>
        {(onClose) => (
          <>
            <ModalHeader className={`flex flex-col gap-1 text-lg text-center ${setColorForPosition(Number(ride.pozycja.substring(1)))}`}>
              {ride.osoba}
            </ModalHeader>
            <ModalBody>
              <div className="grid grid-cols-2">
                <div>
                  <p>Szkoła:</p>
                  <p>Miejsce:</p>
                  <p>Gokart:</p>
                  <p>Czas:</p>
                  <p>Pkt karne:</p>
                  {ride.roznica !== "" && <p>Różnica:</p>}
                </div>
                <div>
                  <p>{ride.szkola}</p>
                  <p>{ride.czas}</p>
                  <p>{ride.gokart}</p>
                  <p>{ride.czas}</p>
                  <p className="text-red-700">2</p>
                  <p className="text-red-700">{ride.roznica}</p>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onPress={onClose}>
                OK
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
