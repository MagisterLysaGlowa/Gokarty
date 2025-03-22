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
  defaultVariant,
} from "../../../../Utils/gloablUtils";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebounce } from "../../../../Utils/debounce";
import {
  useGetColumns,
  useGetMemorizedData,
} from "./playersForTournamentUtils";
import { usePlayerForTournamentCell } from "./playersForTournamentComponents/playersForTournamentCell";
import { RemovePlayersComponent } from "./playersForTournamentComponents/RemovePlayersFromTournamentComponent";
import { PlayerWithSchoolData } from "../../../../../types";

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

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithSchoolData | undefined>(
    undefined
  );
  
  const customCell = usePlayerForTournamentCell(setSelectedPlayer, removeModal);

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
              <TableRow key={item.playerId}>
                {(columnKey) => (
                  <TableCell>{customCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      {selectedPlayer &&
        <RemovePlayersComponent removeModal={removeModal} player={selectedPlayer} />
      }
    </div>
  );
};
