import React, { useCallback } from "react";
import { TableActionProps } from "../../../types";
import { Button } from "@heroui/react";

export const useCustomTableCells = (
    setItem: React.Dispatch<React.SetStateAction<number | undefined>>,
    actions: TableActionProps[],
) => useCallback ((row: Record<string, string>, columnKey: React.Key) => {
    const cellValue = row[columnKey as string];

    if(columnKey === "actions") {
        return (
            <div className="flex gap-3">
            {
                actions.map((action) => {
                    return (
                        <Button
                        {...action.buttonProps}
                        onPress={() => {
                            setItem(Number(row["id"]));
                            action.modal.onOpen();
                        }}
                        />
                    )
                })
            }
            </div>
        )
    } else {
        return cellValue;
    }

    }, [setItem, actions]
);