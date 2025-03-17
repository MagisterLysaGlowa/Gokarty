import { useCallback, useEffect, useMemo, useState } from "react";
import { PlayerQueries } from "../../../../queries/playerQuery";
import {
  PlayerFilterFormData,
  PlayerWithSchoolData,
  SchoolData,
} from "../../../../../types";
import { useParams } from "react-router-dom";
import { SchoolQueries } from "../../../../queries/schoolQuery";
import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  useDisclosure,
} from "@heroui/react";

import { CgAdd } from "react-icons/cg";
import { AddPlayerToTournamentModal } from "./AddPlayerToTournamentModal";
import { defaultVariant } from "../../../../Utils/gloablUtils";

export const AddPlayerForTournament = () => {
  const { id } = useParams();
  const [playerFilter, setPlayerFilter] = useState<PlayerFilterFormData>({
    name: "",
    schoolId: -1,
    surname: "",
    tournamentId: Number(id),
  });

  const { data: schools } = SchoolQueries.getAllSchools();
  const { data: players, refetch } = PlayerQueries.filterPlayers(playerFilter, {
    onSuccess: (z) => console.log(z),
  });

  const [selectedPlayer, setSelectedPlayer] = useState<PlayerWithSchoolData>(
    {} as PlayerWithSchoolData
  );

  useEffect(() => {
    refetch();
  }, [playerFilter, refetch]);

  const columns = useMemo(
    () => [
      {
        key: "name",
        label: "Imie",
      },
      {
        key: "surname",
        label: "Nazwisko",
      },
      {
        key: "birthDate",
        label: "Data urodzenia",
      },
      {
        key: "school",
        label: "Szkoła",
      },
      {
        key: "actions",
        label: "Akcje",
      },
    ],
    []
  );

  const rows = useMemo(() => players || [], [players]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const customCell = useCallback(
    (item: PlayerWithSchoolData, key: React.Key) => {
      const cellValue = item[key as keyof PlayerWithSchoolData];
      if (key === "school")
        return (cellValue as SchoolData).name ?? "Brak danych";
      if (key === "actions")
        return (
          <Button
            isIconOnly
            endContent={<CgAdd />}
            variant="shadow"
            color="primary"
            onPress={() => {
              setSelectedPlayer(item);
              onOpen();
            }}
          />
        );
      if (key === "birthDate" && cellValue instanceof Date)
        return cellValue.toLocaleDateString();

      return typeof cellValue === "string" || typeof cellValue === "number"
        ? cellValue
        : "";
    },
    [onOpen]
  );

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="flex gap-2">
        <Input
          placeholder="Imie"
          className="w-max"
          variant={defaultVariant}
          value={playerFilter.name}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, name: e.target.value }))
          }
        />
        <Input
          placeholder="Nazwisko"
          className="w-max"
          variant={defaultVariant}
          value={playerFilter.surname}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, surname: e.target.value }))
          }
        />
        <Select
          items={schools || []}
          aria-label="Wybierz szkołę"
          value={playerFilter.schoolId}
          variant={defaultVariant}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, schoolId: Number(e.target.value) }))
          }
          placeholder="Wybierz szkołę"
        >
          {(s) => <SelectItem key={s.schoolId}>{s.acronym}</SelectItem>}
        </Select>
      </div>

      <Table
        aria-label="Example table with dynamic content"
        isHeaderSticky
        classNames={{
          wrapper: "bg-transparent shadow-none p-0",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.playerId}>
              {(columnKey) => (
                <TableCell>{customCell(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      <AddPlayerToTournamentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        player={selectedPlayer}
      />
    </div>
  );
};
