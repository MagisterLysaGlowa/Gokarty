import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import {
  columns,
  getTableTextColor,
  TableRowsType,
  useCustomTableRows,
} from "../tournamentTableUtils";

type RidesTableProps = {
  rows: TableRowsType[] | undefined;
};

export const RidesTable: React.FC<RidesTableProps> = ({ rows }) => {
  const customCell = useCustomTableRows();

  return (
    <Table
      aria-label="Example table with dynamic content"
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
          <TableRow key={item.key}>
            {(columnKey) => (
              <TableCell className={`${getTableTextColor(item.key)} text-xl`}>
                {customCell(item, columnKey)}
              </TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};
