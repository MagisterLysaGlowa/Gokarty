import { Button, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { EditGokartModal } from "./addGokartComponents/EditGokartModal";
import { RemoveGokartModal } from "./addGokartComponents/RemoveGokartModal";
import { GokartTable } from "./addGokartComponents/GokartTable";
import { IoMdAdd } from "react-icons/io";
import { AddGokartModal } from "./addGokartComponents/AddGokartModal";

export type GokartRow = {
  lp: number;
  key: number;
  name: string;
};

export const AddGokart = () => {
  const [gokart, setGokart] = useState<GokartRow | undefined>(undefined);

  const editGokartModal = useDisclosure();
  const removeGokartModal = useDisclosure();
  const addGokartModal = useDisclosure();

  return (
    <div className="flex-1">
      <GokartTable
        editGokartModal={editGokartModal}
        removeGokartModal={removeGokartModal}
        setGokart={setGokart}
      />
      {gokart && (
        <>
          <EditGokartModal
            modalProps={editGokartModal}
            gokart={gokart}
            key={`edit-${gokart.key}`}
          />
          <RemoveGokartModal
            modalProps={removeGokartModal}
            gokart={gokart}
            key={`remove-${gokart.key}`}
          />
        </>
      )}
      <AddGokartModal modalProps={addGokartModal} />
      <div className="fixed right-10 bottom-10">
        <Button
          isIconOnly
          endContent={<IoMdAdd />}
          onPress={addGokartModal.onOpen}
          className="rounded-[50%] bg-main-default w-[100px] h-[100px] text-[60px] fixed right-5 bottom-5"
        />
      </div>
    </div>
  );
};
