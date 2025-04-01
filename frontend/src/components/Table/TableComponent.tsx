import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@heroui/react";
import { FC } from "react";

export type TableProps = {
    tableCells: (row: Record<string, string>, columnKey: React.Key) => string | JSX.Element,
    columns: { label: string; key: string; }[],
    rows: Record<string, string>[],
};

export const TableComponent: FC<TableProps> = ({
    tableCells,
    columns,
    rows,
}) => {
    return (
        <Table
            aria-label="Example table with dynamic content"
            className="overflow-y-auto"
            isHeaderSticky
            removeWrapper
            classNames={{ td: "text-xl" }}
            selectionMode="single"
        >
            <TableHeader columns={columns}>
                {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
            </TableHeader>
            <TableBody items={rows}>
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
}