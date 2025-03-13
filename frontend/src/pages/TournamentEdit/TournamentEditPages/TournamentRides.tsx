import React, { useCallback, useMemo } from "react";
import { RideQueries } from "../../../queries/rideQuery";
import { useParams } from "react-router-dom";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableCell,
  TableRow,
  Button,
} from "@heroui/react";
import { Times } from "../../../../types";
import { convertTimeToString } from "../../../Utils/TimeUtils";
import { FaEdit, FaTrash } from "react-icons/fa";

export const TournamentRides = () => {
  const { id } = useParams();
  const { data } = RideQueries.getAllPlayersWithTimes(Number(id), {
    refetchInterval: 3000,
  });

  const columns = useMemo(
    () => [
      { key: "lp", label: "LP" },
      { key: "person", label: "Osoba" },
      { key: "times", label: "Czasy" },
      { key: "gokart", label: "Gokarty" },
      { key: "actions", label: "Akcje" },
    ],
    []
  );

  const rows = useMemo(() => {
    return (
      data?.map((z, index) => ({
        lp: index + 1,
        person: {
          name: `${z.player.name} ${z.player.surname}`,
          school: z.player.school.acronym,
        },
        times: z.times.map(({ time, rideNumber, gokart, rideId }) => ({
          time,
          rideNumber,
          gokart,
          rideId,
        })),
        gokart: z.times.map(({ gokart }) => gokart.name),
      })) || []
    );
  }, [data]);

  type RowType = {
    lp: number;
    person: {
      name: string;
      school: string;
    };
    times: {
      time: number;
      rideNumber: number;
    }[];
    gokart: string[];
  };

  const renderCell = useCallback((row: RowType, columnKey: React.Key) => {
    const cellValue = row[columnKey as keyof RowType];

    switch (columnKey) {
      case "person": {
        const c = cellValue as {
          name: string;
          school: string;
        };
        return (
          <div className="flex flex-col flex-1 justify-center">
            <span className="text-xl">{c.name}</span>
            <span className="text-sm">{c.school}</span>
          </div>
        );
      }
      case "times": {
        const val = cellValue as Times[];
        return (
          <div className={`grid grid-rows-${val.length}`}>
            {val.map((z) => (
              <div className="flex gap-3">
                <span className="w-1/6">{z.rideNumber}.</span>
                <span className="w-5/6">{convertTimeToString(z.time)}</span>
              </div>
            ))}
          </div>
        );
      }
      case "gokart": {
        const val = cellValue as string[];
        return (
          <div className={`grid grid-rows-${val.length}`}>
            {val.map((z) => (
              <div>{z}</div>
            ))}
          </div>
        );
      }
      case "actions": {
        return (
          <div className="flex gap-3">
            <Button endContent={<FaEdit />} variant="shadow" color="primary" />
            <Button
              endContent={<FaTrash />}
              variant="shadow"
              className="bg-red-600"
            />
          </div>
        );
      }

      default:
        return <>{cellValue}</>;
    }
  }, []);

  return (
    <div className="flex h-full">
      <Table
        aria-label="Example"
        className="flex-1"
        isHeaderSticky
        classNames={{
          wrapper: ["bg-transparent shadow-none"],
        }}
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key} className="grid items-center">
              {column.label}
            </TableColumn>
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
    </div>
  );
};
