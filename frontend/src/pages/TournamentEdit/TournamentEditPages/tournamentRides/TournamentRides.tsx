import { RideQueries } from "../../../../queries/rideQuery";
import { useParams } from "react-router-dom";
import { Input, useDisclosure } from "@heroui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useDebounce } from "../../../../Utils/debounce";
import { defaultVariant } from "../../../../Utils/globalUtils";
import { EditRideModal } from "./tournamentRidesComponents/EditRideModal";
import { TournamentRidesTable } from "./tournamentRidesComponents/TournamentRidesTable";
import { Loading } from "../../../../components/Loading/Loading";
import { GokartQueries } from "../../../../queries/gokartQuery";
import { RideModalData } from "./tournamentRidesUtils";
import { queryClient } from "../../../../Utils/ReactQueryConfig";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { convertTimeToString } from "../../../../Utils/TimeUtils";

export const TournamentRides = () => {
  const { id: tournamentId } = useParams();
  const [filter, setFilter] = useState("");
  const search_filter = useDebounce(filter);

  const [selectedRide, setSelectedRide] = useState<RideModalData | undefined>(
    undefined
  );

  const removeModal = useDisclosure();
  const editModal = useDisclosure();

  const { data, isLoading } = RideQueries.getAllPlayersWithTimes(Number(tournamentId), {
    refetchInterval: 10_000,
  });
  const { data: gokarts } = GokartQueries.getAllGokarts();

  const { mutateAsync: removeRide } = RideQueries.removeRide({
    onSuccess: async () =>
      await queryClient.invalidateQueries(["playersWithTimes", Number(tournamentId)]),
  });

  return (
    <div className="flex flex-col flex-1 max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder="Wyszukiwarka"
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
      {isLoading ? 
        <Loading isLoading={isLoading}/> : 
        <TournamentRidesTable
          data={data}
          editModal={editModal}
          removeModal={removeModal}
          searchFilter={search_filter}
          setSelectedRide={setSelectedRide}
        />
      }
      {selectedRide &&
        <>
          <YesNoModal header="Usuwanie przejazdu" modal={removeModal} onYes={async () => removeRide(Number(selectedRide.timeData?.rideId))} key={`remove-${selectedRide.timeData?.rideId}`}>
            <div className="flex flex-col gap-2">
              <div>{"Identyfikator przejazdu: " + selectedRide.timeData?.rideId}</div>
              <div>{selectedRide.player}</div>
              <div>{selectedRide.school}</div>
              <div>{convertTimeToString(Number(selectedRide.timeData?.time))}</div>
            </div>
          </YesNoModal>
          <EditRideModal modal={editModal} ride={selectedRide} gokarts={gokarts} key={`edit-${selectedRide.timeData?.rideId}`}/>
        </>
      }
    </div>
  );
};
