import React, { useCallback } from "react";
import { TableActionProps } from "../../../types";
import { Button } from "@heroui/react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomCellsRow = Record<string, any>;

export const useCustomTableCells = (
  setItem?: React.Dispatch<React.SetStateAction<number | undefined>>,
  actions?: TableActionProps[]
) =>
  useCallback(
    (row: CustomCellsRow, columnKey: React.Key) => {
      const cellValue = row[columnKey as string];

      if (columnKey === "actions") {
        return (
          <div className="flex gap-3">
            {actions?.map((action, i) => {
              return (
                <Button
                  key={i}
                  {...action.buttonProps}
                  onPress={() => {
                    if (setItem) setItem(Number(row["id"]));
                    action.modal.onOpen();
                  }}
                />
              );
            })}
          </div>
        );
      } else {
        return cellValue;
      }
    },
    [setItem, actions]
  );
