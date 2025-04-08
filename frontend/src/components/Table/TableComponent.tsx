import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
} from "@heroui/react";
import { FC, ReactNode } from "react";

export type TableProps = {
  tableCells: (
    row: Record<string, string>,
    columnKey: React.Key
  ) => string | JSX.Element;
  columns: { label: string; key: string }[];
  rows: Record<string, string>[];
  emptyContent?: ReactNode;
  onSelectionChange?: (keys: Selection) => void;
};

export const TableComponent: FC<TableProps> = ({
  tableCells,
  columns,
  rows,
  emptyContent,
  onSelectionChange,
}) => {
  return (
    <Table
      className="overflow-y-auto overflow-x-hidden"
      isHeaderSticky
      removeWrapper
      aria-label="table"
      classNames={{ td: "text-xl" }}
      selectionMode="single"
      onSelectionChange={onSelectionChange}
    >
      <TableHeader columns={columns}>
        {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
      </TableHeader>
      <TableBody items={rows} emptyContent={emptyContent}>
        {(item) => (
          <TableRow key={item.lp}>
            {(columnKey) => (
              <TableCell>{tableCells(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
