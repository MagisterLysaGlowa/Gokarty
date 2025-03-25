import { useParams } from "react-router-dom";
import { PlayerQueries } from "../../../../queries/playerQuery";
import { useState } from "react";
import {
  Input,
  useDisclosure,
} from "@heroui/react";
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
import { RemovePlayersFromTournamentModal } from "./playersForTournamentComponents/RemovePlayersFromTournamentModal";
import { useCustomTableCells } from "../../../../components/CustomTableCells/CustomTableCells";
import { TableComponent } from "../../../../components/Table/TableComponent";
import { Loading } from "../../../../components/Loading/Loading";

export const PlayersForTournament = () => {
  const { id } = useParams();
  const { data, isLoading } = PlayerQueries.getPlayersForTournamentWithSchool(Number(id), {
    refetchInterval: 10_000,
  });
  const [filter, setFilter] = useState("");
  const filterSearch = useDebounce(filter);
  const memoizedData = useGetMemorizedData(data, filterSearch);
  const columns = useGetColumns();
  const removeModal = useDisclosure();

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(
    undefined
  );
  const selectedPlayer = data?.find(player => player.playerId == selectedPlayerId);

  const customCell = useCustomTableCells(setSelectedPlayerId, [{modal: removeModal, buttonProps: defaultRemoveButtonProps}]);

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder={"Wyszukiwarka"}
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
      <div className="flex-1 overflow-auto">
        {isLoading ? 
          <Loading isLoading={isLoading}/> :
          <TableComponent columns={columns} rows={memoizedData} tableCells={customCell}/>
        }
      </div>
      {selectedPlayer &&
        <RemovePlayersFromTournamentModal modal={removeModal} player={selectedPlayer} />
      }
    </div>
  );
};
