import React, { useCallback } from "react";
import { RowType } from "./tournamentRidesUtils";
import { convertTimeToString } from "../../../../Utils/TimeUtils";
import { ModalProps, Times } from "../../../../../types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Button } from "@heroui/react";

export const useCustomCell = (
  setIds: React.Dispatch<React.SetStateAction<number | undefined>>,
  removeModalProps: ModalProps,
  editModalProps: ModalProps
) =>
  useCallback(
    (row: RowType, columnKey: React.Key) => {
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
            <div className="flex flex-col">
              {val.map((z, index) => (
                <div
                  className="flex gap-3"
                  key={`${row.lp}-${z.rideId}-${index}`}
                >
                  <span className="w-1/6">{z.rideNumber}.</span>
                  <span className="w-5/6">
                    {!z.isDSQ ? (
                      convertTimeToString(z.time)
                    ) : (
                      <span className="text-red-600">DSQ</span>
                    )}
                  </span>
                </div>
              ))}
            </div>
          );
        }
        case "gokart": {
          const val = cellValue as string[];
          return (
            <div className={`grid grid-rows-${val.length}`}>
              {val.map((z, index) => (
                <div key={`${z}-${index}`}>{z}</div>
              ))}
            </div>
          );
        }
        case "actions": {
          const ids = row.times.map(({ rideId }) => rideId);
          return (
            <div className="flex flex-col gap-3">
              {ids.map((id) => (
                <div className="flex gap-3" key={`action-${id}`}>
                  <Button
                    size="sm"
                    endContent={<FaEdit />}
                    variant="shadow"
                    color="primary"
                    onPress={() => {
                      setIds(id);
                      editModalProps.onOpen();
                    }}
                  />
                  <Button
                    size="sm"
                    endContent={<FaTrash />}
                    variant="shadow"
                    className="bg-red-600"
                    onPress={() => {
                      setIds(id);
                      removeModalProps.onOpen();
                    }}
                  />
                </div>
              ))}
            </div>
          );
        }

        default:
          return <>{cellValue}</>;
      }
    },
    [removeModalProps, setIds, editModalProps]
  );
