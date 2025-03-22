import { useCallback } from "react";
import { ModalProps, SchoolData } from "../../../../types";
import { Button } from "@heroui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

export const useCustomCell = (
    setSchool: React.Dispatch<React.SetStateAction<SchoolData | undefined>>,
    removeModalProps: ModalProps,
    editModalProps: ModalProps
  ) =>
    useCallback(
      (row: SchoolData, columnKey: React.Key) => {
        const cellValue = row[columnKey as keyof SchoolData];
  
        if(columnKey === "actions") {
            return (
                <div className="flex gap-3">
                    <Button
                        size="sm"
                        endContent={<FaEdit />}
                        variant="shadow"
                        color="primary"
                        onPress={() => {
                            setSchool(row);
                            editModalProps.onOpen();
                        }}
                        />
                    <Button
                        size="sm"
                        endContent={<FaTrash />}
                        variant="shadow"
                        className="bg-red-600"
                        onPress={() => {
                            setSchool(row);
                            removeModalProps.onOpen();
                        }}
                        />
                </div>
            );
        } else {
            return cellValue;
        }
      },
      [removeModalProps, setSchool, editModalProps]
    );