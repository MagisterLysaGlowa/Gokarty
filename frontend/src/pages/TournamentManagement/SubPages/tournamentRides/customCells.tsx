import React, { useCallback } from "react";
import { RideModalData, RowType } from "./tournamentRidesUtils";
import { convertTimeToString } from "../../../../Utils/TimeUtils";
import { ModalProps, RideData } from "../../../../../types";
import { Button } from "@heroui/react";
import { CustomCellsRow } from "../../../../components/CustomTableCells/CustomTableCells";
import { defaultEditButtonProps, defaultRemoveButtonProps } from "../../../../Utils/globalUtils";

export const useCustomCell = (
  setSelectedRide: React.Dispatch<React.SetStateAction<RideModalData | undefined>>,
  removeModalProps: ModalProps,
  editModalProps: ModalProps
) =>
  useCallback(
    (row: CustomCellsRow, columnKey: React.Key) => {
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
          const val = cellValue as RideData[];
          return (
            <div className="flex flex-col gap-3">
              {val.map((z, index) => (
                <div
                  className="flex gap-3 h-[32px]"
                  key={`${row.lp}-${z.rideId}-${index}`}
                >
                  <span className="w-1/6">{z.rideNumber}.</span>
                  <span className="w-5/6">
                    {!z.isDisqualified ? (
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
          return (
            <div className={`grid grid-rows-${row.times.length} gap-3`}>
              {row.times.map((z: RideData, index: number) => (
                <div className="h-[32px]" key={`${z}-${index}`}>{z?.gokart?.name}</div>
              ))}
            </div>
          );
        }
        case "actions": {
          const ids: number[] = row.times.map((time: RideData) => time.rideId);
          return (
            <div className="flex flex-col gap-3">
              {ids.map((id) => (
                <div className="flex gap-3" key={`action-${id}`}>
                  <Button
                    {...defaultEditButtonProps}
                    onPress={() => {
                      setSelectedRide({
                        player: row.person.name,
                        playerId: row.person.id,
                        school: row.person.school,
                        timeData: row.times.find((time: RideData) => time.rideId == id),
                      });
                      editModalProps.onOpen();
                    }}
                  />
                  <Button
                    {...defaultRemoveButtonProps}
                    onPress={() => {
                      setSelectedRide({
                        player: row.person.name,
                        playerId: row.person.id,
                        school: row.person.school,
                        timeData: row.times.find((time: RideData) => time.rideId == id),
                      });
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
    [removeModalProps, setSelectedRide, editModalProps]
  );
