import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { useGetGokartColumns, useGetGokartRows } from "../AddGokartUtils";
import { Dispatch, FC, SetStateAction } from "react";
import { GokartData, ModalProps } from "../../../../types";
import { useCustomTableCells } from "../../../components/CustomTableCells/CustomTableCells";
import { defaultEditButtonProps, defaultRemoveButtonProps } from "../../../Utils/globalUtils";

type GokartTableProps = {
  removeGokartModal: ModalProps;
  editGokartModal: ModalProps;
  setGokart: Dispatch<SetStateAction<number | undefined>>;
  filter: string;
  data: GokartData[] | undefined;
};

export const GokartTable: FC<GokartTableProps> = ({
  editGokartModal,
  setGokart,
  removeGokartModal,
  filter,
  data,
}) => {
  const gokartCell = useCustomTableCells(
    setGokart,
    [{
      modal: editGokartModal, buttonProps: defaultEditButtonProps
    }, {
      modal: removeGokartModal, buttonProps: defaultRemoveButtonProps
    }]
  );
  const columns = useGetGokartColumns();
  const rows = useGetGokartRows(data, filter);
  return (
    <Table
      aria-label="Example table with dynamic content"
      removeWrapper
      classNames={{ td: "text-xl" }}
      isHeaderSticky
      selectionMode="single"
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows}>
        {(item) => (
          <TableRow key={item.lp}>
            {(columnKey) => (
              <TableCell>{gokartCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
