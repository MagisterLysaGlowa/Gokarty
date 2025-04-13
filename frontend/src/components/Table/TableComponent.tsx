import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Selection,
  Button,
} from "@heroui/react";
import React, { FC, ReactNode, SetStateAction, useEffect } from "react";
import { TableActionProps } from "../../../types";
import { CustomCellsRow } from "../CustomTableCells/CustomTableCells";

export type TableProps = {
  tableCells: (
    row: CustomCellsRow,
    columnKey: React.Key
  ) => string | JSX.Element;
  columns: { label: string; key: string }[];
  rows: CustomCellsRow[];
  emptyContent?: ReactNode;
  selectedItems?: number[];
  onSelectionChange?: (keys: Selection) => void;
  massActions?: TableActionProps[];
  setSelectedItems?: React.Dispatch<SetStateAction<number[]>>;
};

export const TableComponent: FC<TableProps> = ({
  tableCells,
  columns,
  rows,
  emptyContent,
  selectedItems,
  onSelectionChange,
  massActions = [],
  setSelectedItems,
}) => {
  useEffect(() => {
    if (setSelectedItems)
      setSelectedItems((prev) => {
        const rowIds = rows.map((row) => Number(row["id"]));
        return prev.filter((item) => rowIds.includes(item));
      });
  }, [rows, setSelectedItems]);

  return (
    <div className="relative max-h-full overflow-y-auto overflow-x-hidden">
      <div
        className={`absolute right-0 top-0 z-30 flex gap-2 items-center bg-[#27272A] py-2 overflow-hidden rounded-xl transition-all duration-500 ease-in-out origin-right ${
          selectedItems?.length ? "max-w-[500px] px-2" : "max-w-0 px-0"
        }`}
      >
        <span className="whitespace-nowrap">
          Wybranych obiektów: {selectedItems?.length}
        </span>
        {massActions.map((action, i) => (
          <Button
            key={i}
            {...action.buttonProps}
            onPress={selectedItems?.length ? action.modal.onOpen : () => {}}
          />
        ))}
      </div>
      <Table
        isHeaderSticky
        removeWrapper
        selectedKeys={selectedItems?.map((i) => i.toString())}
        aria-label="table"
        classNames={{
          td: "text-xl",
          th: massActions.length > 0 ? "first:w-[50px]" : "",
          table: "table-fixed",
        }}
        selectionMode={massActions.length > 0 ? "multiple" : "single"}
        onSelectionChange={(e) => {
          if (onSelectionChange) onSelectionChange(e);
          else if (setSelectedItems) {
            let keys = Array.from(e).map((e) => Number(e));
            if (e == "all") keys = rows.map((row) => Number(row.id));
            setSelectedItems(keys);
          }
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={rows} emptyContent={emptyContent}>
          {(item) => (
            <TableRow key={Number(item.id)}>
              {(columnKey) => (
                <TableCell>{tableCells(item, columnKey)}</TableCell>
              )}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
