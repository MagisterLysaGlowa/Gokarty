import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@heroui/react";
import {
  columns,
  getTableTextColor,
  TableRowsType,
  useCustomTableRows,
} from "../tournamentTableUtils";
import { useState } from "react";
import { RideInfoModal } from "./RideInfoModal";

type RidesTableProps = {
  rows: TableRowsType[] | undefined;
};

export const RidesTable: React.FC<RidesTableProps> = ({ rows }) => {
  const [selectedRide,setSelectedRide] = useState<TableRowsType | undefined>(undefined); 
  const customCell = useCustomTableRows();
  const rideInfoModal = useDisclosure();

  return (
    <><Table
      aria-label=":c"
      className="bg-transparent table flex-1 !p-0"
      hideHeader
      classNames={{
        wrapper: ["bg-transparent", "shadow-none"],
      }}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows ?? []}>
        {(item) => (
          <TableRow onClick={()=>{setSelectedRide(item);rideInfoModal.onOpen()}} key={item.key}>
            {(columnKey) => (
              <TableCell className={`${getTableTextColor(item.key)} text-xl`}>
                {customCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
    {selectedRide && <RideInfoModal modalProps={rideInfoModal} ride={selectedRide}/>}
    </>
  );
};
