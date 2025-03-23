import { Button, Input, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { EditGokartModal } from "./addGokartComponents/EditGokartModal";
import { RemoveGokartModal } from "./addGokartComponents/RemoveGokartModal";
import { GokartTable } from "./addGokartComponents/GokartTable";
import { IoMdAdd } from "react-icons/io";
import { AddGokartModal } from "./addGokartComponents/AddGokartModal";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GokartQueries } from "../../queries/gokartQuery";

export const AddGokart = () => {
  const { data: data } = GokartQueries.getAllGokarts();
  const [selectedGokartId, setSelectedGokartId] = useState<number | undefined>(undefined);
  const selectedGokart = data?.find(gokart => gokart.gokartId == selectedGokartId);
  const [filter, setFilter] = useState("");

  const editGokartModal = useDisclosure();
  const removeGokartModal = useDisclosure();
  const addGokartModal = useDisclosure();

  return (
    <div className="flex-1">
      <div className="my-3">
        <Input
          className="w-1/3"
          variant="bordered"
          placeholder="Wyszukiwarka"
          startContent={<FaMagnifyingGlass />}
          onValueChange={(e) => setFilter(e)}
          value={filter}
        />
      </div>
      <GokartTable
        data={data}
        editGokartModal={editGokartModal}
        removeGokartModal={removeGokartModal}
        setGokart={setSelectedGokartId}
        filter={filter}
      />
      {selectedGokart && (
        <>
          <EditGokartModal
            modalProps={editGokartModal}
            gokart={selectedGokart}
            key={`edit-${selectedGokart.gokartId}`}
          />
          <RemoveGokartModal
            modalProps={removeGokartModal}
            gokart={selectedGokart}
            key={`remove-${selectedGokart.gokartId}`}
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
