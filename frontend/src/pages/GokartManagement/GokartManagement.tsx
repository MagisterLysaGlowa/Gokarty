import { Button, Input, useDisclosure } from "@heroui/react";
import { useState } from "react";
import { EditGokartModal } from "./components/EditGokartModal";
import { IoMdAdd } from "react-icons/io";
import { AddGokartModal } from "./components/AddGokartModal";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { GokartQueries } from "../../queries/gokartQuery";
import { useCustomTableCells } from "../../components/CustomTableCells/CustomTableCells";
import { useGetGokartColumns, useGetGokartRows } from "./GokartManagementUtils";
import {
  defaultEditButtonProps,
  defaultRemoveButtonProps,
} from "../../Utils/globalUtils";
import { TableComponent } from "../../components/Table/TableComponent";
import { YesNoModal } from "../../components/YesNoModal/YesNoModal";
import { inputConfig } from "../../configs/inputConfig";
import { TableActionProps } from "../../../types";

export const AddGokart = () => {
  const { data: data } = GokartQueries.getAllGokarts();
  const [selectedGokartId, setSelectedGokartId] = useState<number | undefined>(
    undefined
  );
  const selectedGokart = data?.find(
    (gokart) => gokart.gokartId == selectedGokartId
  );
  const [selectedGokartIds, setSelectedGokartIds] = useState<number[]>([]);
  const [filter, setFilter] = useState("");

  const editGokartModal = useDisclosure();
  const removeGokartModal = useDisclosure();
  const addGokartModal = useDisclosure();
  const massRemoveGokartModal = useDisclosure();

  const gokartCell = useCustomTableCells(setSelectedGokartId, [
    { modal: editGokartModal, buttonProps: defaultEditButtonProps },
    { modal: removeGokartModal, buttonProps: defaultRemoveButtonProps },
  ]);
  const massActions: TableActionProps[] = [
    { modal: massRemoveGokartModal, buttonProps: defaultRemoveButtonProps },
  ];
  const columns = useGetGokartColumns();
  const rows = useGetGokartRows(data, filter);

  const { mutateAsync: removeGokartAsync } = GokartQueries.removeGokart();
  const { mutateAsync: removeGokartsAsync } = GokartQueries.removeGokarts();

  return (
    <div className="max-h-full h-full grid grid-rows-[50px_calc(100%-50px)]">
      <div>
        <Input
          className="w-1/3"
          placeholder="Wyszukiwarka"
          startContent={<FaMagnifyingGlass />}
          onValueChange={(e) => setFilter(e)}
          value={filter}
          {...inputConfig}
        />
      </div>

      <TableComponent
        columns={columns}
        rows={rows}
        tableCells={gokartCell}
        selectedItems={selectedGokartIds}
        massActions={massActions}
        setSelectedItems={setSelectedGokartIds}
      />

      {selectedGokart && (
        <>
          <EditGokartModal
            modal={editGokartModal}
            gokart={selectedGokart}
            key={`edit-${selectedGokartId}`}
          />
          <YesNoModal
            header="Usuń gokart"
            modal={removeGokartModal}
            onYes={async () =>
              await removeGokartAsync(Number(selectedGokartId))
            }
            key={`remove-${selectedGokartId}`}
          >
            {selectedGokart.name}
          </YesNoModal>
        </>
      )}
      {selectedGokartIds && (
        <YesNoModal
          header="Usuń gokarty"
          modal={massRemoveGokartModal}
          onYes={async () => await removeGokartsAsync(selectedGokartIds)}
          key={`remove-${selectedGokartIds.length}`}
        >
          {`Czy chcesz usunąć ${selectedGokartIds.length} gokartów?`}
        </YesNoModal>
      )}
      <AddGokartModal modal={addGokartModal} key={`add`} />
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
