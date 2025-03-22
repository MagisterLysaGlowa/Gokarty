import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { useGokartCell } from "./GokartTableCell";
import { useGetGokartColumns, useGetGokartRows } from "../AddGokartUtils";
import { Dispatch, FC, SetStateAction } from "react";
import { GokartQueries } from "../../../queries/gokartQuery";
import { GokartRow } from "../AddGokart";
import { ModalProps } from "../../../../types";

type GokartTableProps = {
  removeGokartModal: ModalProps;
  editGokartModal: ModalProps;
  setGokart: Dispatch<SetStateAction<GokartRow | undefined>>;
  filter: string;
};

export const GokartTable: FC<GokartTableProps> = ({
  editGokartModal,
  setGokart,
  removeGokartModal,
  filter,
}) => {
  const gokartCell = useGokartCell(
    editGokartModal,
    removeGokartModal,
    setGokart
  );
  const columns = useGetGokartColumns();
  const { data: gokarts } = GokartQueries.getAllGokarts();
  const rows = useGetGokartRows(gokarts, filter);
  return (
    <Table
      aria-label="Example table with dynamic content"
      removeWrapper
      classNames={{ td: "text-xl" }}
      isHeaderSticky
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell>{gokartCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
