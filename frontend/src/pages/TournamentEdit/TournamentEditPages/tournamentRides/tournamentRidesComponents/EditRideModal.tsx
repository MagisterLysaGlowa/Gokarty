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
import { FullRideData, ModalProps } from "../../../../../../types";
import { RideQueries } from "../../../../../queries/rideQuery";
import { useState } from "react";
import {
  calculateTimeFromStringToMs,
  convertTimeToString,
} from "../../../../../Utils/TimeUtils";
import { GokartQueries } from "../../../../../queries/gokartQuery";
import { useParams } from "react-router-dom";
import { queryClient } from "../../../../../Utils/ReactQueryConfig";

type EditModalProps = {
  editModal: ModalProps;
  rideId: number;
};

export const EditRideModal: React.FC<EditModalProps> = ({
  editModal,
  rideId,
}) => {
  const { id } = useParams();
  const { isOpen, onOpenChange } = editModal;
  const [rideToEdit, setRideToEdit] = useState<FullRideData>({
    gokartId: -1,
    isDisqualified: false,
    playerId: -1,
    rideId: Number(rideId),
    rideNumber: -1,
    time: -1,
    tournamentId: Number(id),
  });
  const [time, setTime] = useState<string>("");

  RideQueries.getFullRide(Number(rideId), {
    onSuccess: (r) => {
      setTime(convertTimeToString(r.time));
      setRideToEdit(r);
    },
  });

  const { mutateAsync: updateRide } = RideQueries.updateRide({
    onSuccess: async () => {
      await queryClient.invalidateQueries(["playersWithTimes", Number(id)]);
      await queryClient.invalidateQueries(["ride", Number(rideId)]);
    },
  });

  const { data: gokarts } = GokartQueries.getAllGokarts();

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange} key={rideToEdit.rideId}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Edytuj przejazd
            </ModalHeader>
            <ModalBody>
              <Input
                value={String(rideToEdit?.rideId)}
                readOnly
                label="Identyfikator przejazdu"
              />
              <Input
                value={`${rideToEdit?.player?.name} ${rideToEdit?.player?.surname}`}
                label="Osoba"
                readOnly
              />
              <Input
                value={time}
                label="Czas"
                maxLength={9}
                onChange={(e) => setTime(e.target.value)}
              />
              <Checkbox
                isSelected={rideToEdit.isDisqualified}
                onValueChange={(e) =>
                  setRideToEdit((p) => ({ ...p, isDisqualified: e }))
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
                      rideId: Number(rideId),
                      data: {
                        gokartId: rideToEdit.gokartId,
                        isDisqualified:
                          rideToEdit.isDisqualified == true ? 1 : 0,
                        playerId: rideToEdit.playerId,
                        time: calculateTimeFromStringToMs(time),
                        tournamentId: Number(id),
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
