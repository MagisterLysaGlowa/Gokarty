import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Checkbox,
} from "@heroui/react";
import { GokartData, ModalProps, RideData } from "../../../../../../types";
import { RideQueries } from "../../../../../queries/rideQuery";
import { useEffect, useState } from "react";
import {
  calculateTimeFromStringToMs,
  convertTimeToString,
} from "../../../../../Utils/TimeUtils";
import { RideModalData } from "../tournamentRidesUtils";
import { modalConfig } from "../../../../../configs/modalConfig";
import { inputConfig } from "../../../../../configs/inputConfig";
import {
  cancelButtonConfig,
  confirmButtonConfig,
} from "../../../../../configs/buttonConfig";
import { selectConfig } from "../../../../../configs/selectConfig";

type EditModalProps = {
  modal: ModalProps;
  ride: RideModalData;
  gokarts?: GokartData[];
};

export const EditRideModal: React.FC<EditModalProps> = ({
  modal,
  ride,
  gokarts,
}) => {
  const rideDefault = {
    gokartId: Number(ride?.timeData?.gokart?.gokartId),
    isDisqualified: Boolean(ride.timeData?.isDisqualified),
    time: Number(ride.timeData?.time),
    penaltyPoints: Number(ride.timeData?.penaltyPoints),
    rideId: Number(ride.timeData?.rideId),
    rideNumber: Number(ride.timeData?.rideNumber),
    rideGroupId: Number(ride.timeData?.rideGroupId)
  }
  
  const [rideToEdit, setRideToEdit] = useState<RideData>(rideDefault);
  const [time, setTime] = useState<string>(
    convertTimeToString(Number(ride.timeData?.time))
  );
  const { mutateAsync: updateRide } = RideQueries.updateRide();

  useEffect(() => {
    setRideToEdit(rideDefault);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ride, gokarts])

  if (!gokarts) return;

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
              Edytuj przejazd
            </ModalHeader>
            <ModalBody>
              <Input
                value={String(ride.timeData?.rideId)}
                readOnly
                label="Identyfikator przejazdu"
                {...inputConfig}
              />
              <Input
                value={ride.player}
                label="Osoba"
                readOnly
                {...inputConfig}
              />
              <Input
                placeholder="00:00:000"
                value={time}
                label="Czas"
                maxLength={9}
                onChange={(e) => setTime(e.target.value)}
                {...inputConfig}
              />
              <Checkbox
                isSelected={Boolean(rideToEdit.isDisqualified)}
                onValueChange={(e) =>
                  setRideToEdit((p) => ({ ...p, isDisqualified: e }))
                }
              >
                Dyskwalifikacja
              </Checkbox>
              <Select
                {...selectConfig}
                items={gokarts}
                label="Gokart"
                selectedKeys={String(rideToEdit?.gokartId)}
                selectionMode="single"
                onChange={(e) =>
                  setRideToEdit((prev) => ({
                    ...prev,
                    gokartId: Number(e.target.value),
                  }))
                }
              >
                {(gokart) => (
                  <SelectItem key={gokart.gokartId}>{gokart.name}</SelectItem>
                )}
              </Select>
            </ModalBody>
            <ModalFooter>
              <Button {...cancelButtonConfig} onPress={onClose}>
                Anuluj
              </Button>
              <Button
                {...confirmButtonConfig}
                onPress={async () => {
                  const timeRegex = /^\d{2}:\d{2}:\d{3}$/;
                  if (rideToEdit && timeRegex.test(time)) {
                    await updateRide({
                        ...rideToEdit,
                        time: calculateTimeFromStringToMs(time)
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
