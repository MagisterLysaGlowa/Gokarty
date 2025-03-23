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

type RemoveRideProps = {
  modal: ModalProps;
  rideId: number | undefined;
};

export const RemoveRideModal: React.FC<RemoveRideProps> = ({
  modal,
  rideId,
}) => {
  const { id: tournamentId } = useParams();

  const {
    data: ride,
    isLoading,
    isFetching,
  } = RideQueries.getFullRide(Number(rideId));

  const { mutateAsync: removeRide } = RideQueries.removeRide({
    onSuccess: async () =>
      await queryClient.invalidateQueries(["playersWithTimes", tournamentId]),
  });

  if (!ride || isLoading || isFetching) return;

  return (
    <Modal {...modal}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader>Usuwanie przejazdu</ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <div>{ride.tournament?.name}</div>
                <div>{ride.player?.name + " " + ride.player?.surname}</div>
                <div>{ride.gokart?.name}</div>
                <div>{convertTimeToString(ride.time)}</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Anuluj
              </Button>
              <Button
                color="primary"
                onPress={async () => {
                  await removeRide(Number(rideId));
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
