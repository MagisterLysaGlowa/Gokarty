import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";

import { useGetColumns, useMemorizedSchoolsData } from "../SchoolManagementUtils";
import { Dispatch, SetStateAction } from "react";
import { ModalProps, SchoolData } from "../../../../types";
import { useCustomTableCells } from "../../../components/CustomTableCells/CustomTableCells";
import { defaultEditButtonProps, defaultRemoveButtonProps } from "../../../Utils/globalUtils";

type TournamentTableProps = {
  setSelectedSchool: Dispatch<SetStateAction<number | undefined>>;
  data: SchoolData[] | undefined;
  searchFilter: string;
  editModal: ModalProps;
  removeModal: ModalProps;
};

export const SchoolsTable: React.FC<TournamentTableProps> = ({
  searchFilter,
  setSelectedSchool,
  data,
  editModal,
  removeModal,
}) => {
  const columns = useGetColumns();
  const rows = useMemorizedSchoolsData(data, searchFilter);
  const renderCell = useCustomTableCells(
    setSelectedSchool, [
    { modal: editModal, buttonProps: defaultEditButtonProps },
    { modal: removeModal, buttonProps: defaultRemoveButtonProps }]
  );
  return (
    <Table
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
