import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import { useCustomCell } from "../customCells";
import { useGetColumns, useMemorizedRidesData } from "../tournamentRidesUtils";
import { ModalProps, PlayersWithTimes } from "../../../../../../types";
import { Dispatch, SetStateAction } from "react";

type TournamentTableProps = {
  setSelectedRide: Dispatch<SetStateAction<number | undefined>>;
  data: PlayersWithTimes[] | undefined;
  searchFilter: string;
  editModal: ModalProps;
  removeModal: ModalProps;
};

export const TournamentRidesTable: React.FC<TournamentTableProps> = ({
  searchFilter,
  setSelectedRide,
  data,
  editModal,
  removeModal,
}) => {
  const columns = useGetColumns();
  const rows = useMemorizedRidesData(data, searchFilter);
  const renderCell = useCustomCell(
    setSelectedRide,
    removeModal,
    editModal
  );
  return (
    <Table
      aria-label="Example"
      className="overflow-y-auto"
      isHeaderSticky
      removeWrapper
      classNames={{
        tr: "text-xl",
      }}
      selectionMode="single"
    >
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.lp}>
            {(columnKey) => (
              <TableCell className="text-xl">
                {renderCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
