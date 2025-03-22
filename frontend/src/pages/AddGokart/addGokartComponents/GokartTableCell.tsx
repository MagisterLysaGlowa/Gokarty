import { Button } from "@heroui/react";
import { Dispatch, SetStateAction, useCallback } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { GokartRow } from "../AddGokart";
import { ModalProps } from "../../../../types";

export const useGokartCell = (
  editGokartModal: ModalProps,
  removeGokart: ModalProps,
  setGokart: Dispatch<SetStateAction<GokartRow | undefined>>
) =>
  useCallback(
    (row: GokartRow, key: React.Key) => {
      if (key === "actions")
        return (
          <div className="flex gap-3">
            <Button
              endContent={<FaEdit />}
              isIconOnly
              color="primary"
              onPress={() => {
                editGokartModal.onOpen();
                setGokart(row);
              }}
            />
            <Button
              endContent={<FaTrash />}
              isIconOnly
              className="bg-red-700"
              onPress={() => {
                removeGokart.onOpen();
                setGokart(row);
              }}
            />
          </div>
        );
      return row[key as keyof GokartRow];
    },
    [editGokartModal, removeGokart, setGokart]
  );
