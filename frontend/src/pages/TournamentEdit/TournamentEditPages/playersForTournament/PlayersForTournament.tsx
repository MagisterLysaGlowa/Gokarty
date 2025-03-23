import { useParams } from "react-router-dom";
import { PlayerQueries } from "../../../../queries/playerQuery";
import { useState } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  useDisclosure,
} from "@heroui/react";
import {
  basicTableClasses,
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

export const PlayersForTournament = () => {
  const { id } = useParams();
  const { data } = PlayerQueries.getPlayersForTournamentWithSchool(Number(id), {
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
        <Table
          aria-label="Example table with custom cells"
          isHeaderSticky
          classNames={{
            ...basicTableClasses,
            td: "text-xl",
            base: "max-h-full",
          }}
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={memoizedData}>
            {(item) => (
              <TableRow key={item.Lp}>
                {(columnKey) => (
                  <TableCell>{customCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedPlayer &&
        <RemovePlayersFromTournamentModal modal={removeModal} player={selectedPlayer} />
      }
    </div>
  );
};
