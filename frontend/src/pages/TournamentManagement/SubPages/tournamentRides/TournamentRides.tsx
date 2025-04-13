import { RideQueries } from "../../../../queries/rideQuery";
import { useParams } from "react-router-dom";
import { Input, useDisclosure } from "@heroui/react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useState } from "react";
import { useDebounce } from "../../../../Utils/debounce";
import { defaultVariant } from "../../../../Utils/globalUtils";
import { EditRideModal } from "./tournamentRidesComponents/EditRideModal";
import { Loading } from "../../../../components/Loading/Loading";
import { GokartQueries } from "../../../../queries/gokartQuery";
import { RideModalData, useGetColumns, useMemorizedRidesData } from "./tournamentRidesUtils";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { convertTimeToString } from "../../../../Utils/TimeUtils";
import { inputConfig } from "../../../../configs/inputConfig";
import { TableComponent } from "../../../../components/Table/TableComponent";
import { useCustomCell } from "./customCells";

export const TournamentRides = () => {
  const { id: tournamentId } = useParams();
  const [filter, setFilter] = useState("");
  const searchFilter = useDebounce(filter);

  const [selectedRide, setSelectedRide] = useState<RideModalData | undefined>(
    undefined
  );

  const { data, isLoading } = RideQueries.getAllPlayersWithTimes(Number(tournamentId));
  const { data: gokarts } = GokartQueries.getAllGokarts();

  const removeModal = useDisclosure();
  const editModal = useDisclosure();

  const columns = useGetColumns();
  const rows = useMemorizedRidesData(data, searchFilter);
  const renderCell = useCustomCell(
      setSelectedRide,
      removeModal,
      editModal
    );

  const { mutateAsync: removeRide } = RideQueries.removeRide();

  return (
    <div className="flex flex-col flex-1 max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder="Wyszukiwarka"
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          {...inputConfig}
        />
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        <TableComponent
          columns={columns}
          rows={rows}
          tableCells={renderCell}
          emptyContent={<span>Tutaj pojawią się zatwierdzone przejazdy zawodników.</span>}
        />
      )}
      {selectedRide && (
        <>
          <YesNoModal
            header="Usuwanie przejazdu"
            modal={removeModal}
            onYes={async () =>
              removeRide(Number(selectedRide.timeData?.rideId))
            }
            key={`remove-${selectedRide.timeData?.rideId}`}
          >
            <div className="flex flex-col gap-2">
              <div>
                {"Identyfikator przejazdu: " + selectedRide.timeData?.rideId}
              </div>
              <div>{selectedRide.player}</div>
              <div>{selectedRide.school}</div>
              <div>
                {convertTimeToString(Number(selectedRide.timeData?.time))}
              </div>
            </div>
          </YesNoModal>
          <EditRideModal
            modal={editModal}
            ride={selectedRide}
            gokarts={gokarts}
            key={`edit-${selectedRide.timeData?.rideId}`}
          />
        </>
      )}
    </div>
  );
};
