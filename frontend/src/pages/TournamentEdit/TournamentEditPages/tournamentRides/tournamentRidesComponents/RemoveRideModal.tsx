import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";
import { ModalProps } from "../../../../../../types";
import { RideQueries } from "../../../../../queries/rideQuery";
import { convertTimeToString } from "../../../../../Utils/TimeUtils";
import { queryClient } from "../../../../../Utils/ReactQueryConfig";
import { useParams } from "react-router-dom";
import { RideModalData } from "../tournamentRidesUtils";

type RemoveRideProps = {
  modal: ModalProps;
  ride?: RideModalData;
};

export const RemoveRideModal: React.FC<RemoveRideProps> = ({
  modal,
  ride,
}) => {
  const { id: tournamentId } = useParams();
  const { mutateAsync: removeRide } = RideQueries.removeRide({
    onSuccess: async () =>
      await queryClient.invalidateQueries(["playersWithTimes", tournamentId]),
  });

  if (!ride) return;

  return (
    <Modal {...modal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Usuwanie przejazdu</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <div>{"Identyfikator przejazdu: " + ride.timeData?.rideId}</div>
                <div>{ride.player}</div>
                <div>{ride.school}</div>
                <div>{convertTimeToString(Number(ride.timeData?.time))}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await removeRide(Number(ride.timeData?.rideId));
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
