import { RideQueries } from "../../../../queries/rideQuery";
import { useParams } from "react-router-dom";
import { Input, useDisclosure } from "@heroui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useDebounce } from "../../../../Utils/debounce";
import { defaultVariant } from "../../../../Utils/gloablUtils";
import { RemoveRidesComponent } from "./tournamentRidesComponents/RemoveRidesComponent";
import { EditRideModal } from "./tournamentRidesComponents/EditRideModal";
import { TournamentRidesTable } from "./tournamentRidesComponents/TournamentRidesTable";

export const TournamentRides = () => {
  const { id } = useParams();
  const [filter, setFilter] = useState("");
  const search_filter = useDebounce(filter);

  const [selectedRide, setSelectedRide] = useState<number | undefined>(
    undefined
  );

  const removeModal = useDisclosure();
  const editModal = useDisclosure();

  const { data } = RideQueries.getAllPlayersWithTimes(Number(id), {
    refetchInterval: 10_000,
  });

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder="Wyszukiwarka"
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
      <TournamentRidesTable
        data={data}
        editModal={editModal}
        removeModal={removeModal}
        searchFilter={search_filter}
        setSelectedRide={setSelectedRide}
      />
      <RemoveRidesComponent removeModal={removeModal} rideId={selectedRide} />
      <EditRideModal editModal={editModal} rideId={Number(selectedRide)} />
    </div>
  );
};
