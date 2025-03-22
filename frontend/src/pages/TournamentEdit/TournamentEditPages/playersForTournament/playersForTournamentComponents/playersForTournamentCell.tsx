import { Button } from "@heroui/react";
import { FaTrash } from "react-icons/fa";
import { ModalProps, PlayerWithSchoolData, SchoolData } from "../../../../../../types";
import { Dispatch, SetStateAction, useCallback } from "react";

export const usePlayerForTournamentCell = (
  setSelectedPlayer: Dispatch<SetStateAction<PlayerWithSchoolData | undefined>>,
  removeModalProps: ModalProps,
) => {
  return useCallback((data: PlayerWithSchoolData, columnKey: React.Key) => {
    const cellValue = data[columnKey as keyof PlayerWithSchoolData];

    switch (columnKey) {
      case "school": {
        const c = cellValue as SchoolData;
        return <>{c.name}</>;
      }
      case "birthDate":
        return <>{new Date(cellValue as string).toLocaleDateString()}</>;
      case "actions":
        return (
          <div className="flex gap-3 w-max text-xl">
            <Button
              onPress={() => {
                setSelectedPlayer(data);
                removeModalProps.onOpen();
              }}
              endContent={<FaTrash />}
              className="bg-red-600"
              variant="shadow"
            />
          </div>
        );
      default:
        return <>{cellValue}</>;
    }
  }, [removeModalProps, setSelectedPlayer]);
};
