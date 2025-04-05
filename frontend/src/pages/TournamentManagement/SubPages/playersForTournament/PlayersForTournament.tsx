import { useParams } from "react-router-dom";
import { PlayerQueries } from "../../../../queries/playerQuery";
import { useState } from "react";
import { Input, useDisclosure } from "@heroui/react";
import {
  defaultRemoveButtonProps,
  defaultVariant,
} from "../../../../Utils/globalUtils";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebounce } from "../../../../Utils/debounce";
import {
  useGetColumns,
  useGetMemorizedData,
} from "./playersForTournamentUtils";
import { useCustomTableCells } from "../../../../components/CustomTableCells/CustomTableCells";
import { TableComponent } from "../../../../components/Table/TableComponent";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { inputConfig } from "../../../../configs/inputConfig";
import { LoadingWrapper } from "../../../../components/Loading/LoadingWrapper";

export const PlayersForTournament = () => {
  const { id: tournamentId } = useParams();
  const { data, isLoading } = PlayerQueries.getPlayersForTournament(Number(tournamentId));
  const { mutateAsync: removePlayerFromTournament } = PlayerQueries.removePlayerFromTournament();

  const [filter, setFilter] = useState("");
  const filterSearch = useDebounce(filter);
  
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined);
  const selectedPlayer = data?.find((player) => player.playerId == selectedPlayerId);
  
  const removeModal = useDisclosure();
  const columns = useGetColumns();
  const memoizedData = useGetMemorizedData(data, filterSearch);
  const customCell = useCustomTableCells(setSelectedPlayerId, [
    { modal: removeModal, buttonProps: defaultRemoveButtonProps },
  ]);


  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder={"Wyszukiwarka"}
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          {...inputConfig}
        />
      </div>
      
      <div className="flex-1 overflow-auto">
        <LoadingWrapper data={memoizedData} isLoading={isLoading}>
          {(rows) => <TableComponent columns={columns} rows={rows} tableCells={customCell}/>}
        </LoadingWrapper>
      </div>

      {selectedPlayer && (
        <YesNoModal
          header="Usuwanie gracza z turnieju"
          modal={removeModal}
          onYes={async () =>
            removePlayerFromTournament({
              tournamentId: Number(tournamentId),
              playerId: Number(selectedPlayerId),
            })
          }
          key={`remove-${selectedPlayerId}`}
        >
          <div className="flex flex-col gap-2">
            <div>{selectedPlayer.name + " " + selectedPlayer.surname}</div>
            <div>{selectedPlayer.birthDate.toLocaleDateString()}</div>
            <div>{selectedPlayer.class?.school?.acronym ?? ""}</div>
          </div>
        </YesNoModal>
      )}
    </div>
  );
};
