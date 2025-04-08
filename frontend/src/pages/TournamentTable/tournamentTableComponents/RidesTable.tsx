import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  useDisclosure,
} from "@heroui/react";
import { useState, useEffect } from "react";
import {
  TableRowsType,
  useCustomTableRows,
  columns,
  getTableTextColor,
} from "../tournamentTableUtils";
import { RideInfoModal } from "./RideInfoModal";

type RidesTableProps = {
  rows: TableRowsType[] | undefined;
};

export const RidesTable: React.FC<RidesTableProps> = ({ rows }) => {
  const [selectedRide, setSelectedRide] = useState<TableRowsType | undefined>(
    undefined
  );
  const customCell = useCustomTableRows();
  const rideInfoModal = useDisclosure();
  const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 1024);

  const handleResize = () => {
    setIsSmallScreen(window.innerWidth < 1024);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <Table
        className="bg-transparent table flex-1 !p-0 mr-2"
        hideHeader
        removeWrapper
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody emptyContent="Tutaj pokażą się wyniki zawodników." items={rows ?? []}>
          {(item) => (
            <TableRow
              onClick={() => {
                if (isSmallScreen) {
                  setSelectedRide(item);
                  rideInfoModal.onOpen();
                }
              }}
              key={item.key}
            >
              {(columnKey) => (
                <TableCell 
                  className={`${getTableTextColor(
                    item.key
                  )} text-sm sm:text-lg md:text-md lg:text-lg xl:text-xl`}
                >
                  {customCell(item, columnKey)}
                </TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
      {selectedRide && (
        <RideInfoModal
          modal={rideInfoModal}
          ride={selectedRide}
          key={`info-${selectedRide.key}`}
        />
      )}
    </>
  );
};
