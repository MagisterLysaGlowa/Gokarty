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
import { GokartData, ModalProps, RideFormData } from "../../../../../../types";
import { RideQueries } from "../../../../../queries/rideQuery";
import { useState } from "react";
import {
  calculateTimeFromStringToMs,
  convertTimeToString,
} from "../../../../../Utils/TimeUtils";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../../../Utils/ReactQueryConfig";
import { RideModalData } from "../tournamentRidesUtils";

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
  const { id: tournamentId } = useParams();
  const [rideToEdit, setRideToEdit] = useState<RideFormData>({
    gokartId: Number(ride.timeData?.gokart.gokartId),
    isDisqualified: Number(ride.timeData?.isDSQ),
    playerId: ride.playerId,
    time: Number(ride.timeData?.time),
    tournamentId: Number(tournamentId),
  });

  const [time, setTime] = useState<string>(convertTimeToString(Number(ride.timeData?.time)));

  const { mutateAsync: updateRide } = RideQueries.updateRide({
    onSuccess: async () => await queryClient.invalidateQueries(["playersWithTimes", Number(tournamentId)])
  });

  if(!gokarts) return;

  return (
    <Modal isOpen={modal.isOpen} onOpenChange={modal.onOpenChange}>
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
              />
              <Input
                value={ride.player}
                label="Osoba"
                readOnly
              />
              <Input
                placeholder="00:00:000"
                value={time}
                label="Czas"
                maxLength={9}
                onChange={(e) => setTime(e.target.value)}
              />
              <Checkbox
                isSelected={Boolean(rideToEdit.isDisqualified)}
                onValueChange={(e) =>
                  setRideToEdit((p) => ({ ...p, isDisqualified: Number(e) }))
                }
              >
                Dyskwalifikacja
              </Checkbox>
              <Select
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
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  const timeRegex = /^\d{2}:\d{2}:\d{3}$/;
                  if (rideToEdit && timeRegex.test(time)) {
                    await updateRide({
                      rideId: Number(ride.timeData?.rideId),
                      data: {
                        ...rideToEdit,
                        time: calculateTimeFromStringToMs(time),
                      },
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
