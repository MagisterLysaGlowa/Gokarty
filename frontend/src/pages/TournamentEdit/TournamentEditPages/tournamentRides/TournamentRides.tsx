import { RideQueries } from "../../../../queries/rideQuery";
import { useParams } from "react-router-dom";
import { Input, useDisclosure } from "@heroui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useDebounce } from "../../../../Utils/debounce";
import { defaultVariant } from "../../../../Utils/globalUtils";
import { RemoveRideModal } from "./tournamentRidesComponents/RemoveRideModal";
import { EditRideModal } from "./tournamentRidesComponents/EditRideModal";
import { TournamentRidesTable } from "./tournamentRidesComponents/TournamentRidesTable";
import { Loading } from "../../../../components/Loading/Loading";

export const TournamentRides = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState("");
  const search_filter = useDebounce(filter);

  const [selectedRide, setSelectedRide] = useState<number | undefined>(
    undefined
  );

  const removeModal = useDisclosure();
  const editModal = useDisclosure();

  const { data, isLoading } = RideQueries.getAllPlayersWithTimes(Number(id), {
    refetchInterval: 10_000,
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
      <RemoveRideModal modal={removeModal} rideId={selectedRide} />
      <EditRideModal modal={editModal} rideId={Number(selectedRide)} />
    </div>
  );
};
