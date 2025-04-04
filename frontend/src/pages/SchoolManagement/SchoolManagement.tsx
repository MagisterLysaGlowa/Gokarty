import "./schoolManagement.css";
import { useState } from "react";
import { SchoolQueries } from "../../queries/schoolQuery";
import { Button, Input, useDisclosure } from "@heroui/react";
import { Loading } from "../../components/Loading/Loading";
import { useDebounce } from "../../Utils/debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { defaultEditButtonProps, defaultRemoveButtonProps, defaultVariant } from "../../Utils/globalUtils";
import { EditSchoolModal } from "./components/EditSchoolModal";
import { useCustomTableCells } from "../../components/CustomTableCells/CustomTableCells";
import { useGetColumns, useMemorizedSchoolsData } from "./SchoolManagementUtils";
import { TableComponent } from "../../components/Table/TableComponent";
import { YesNoModal } from "../../components/YesNoModal/YesNoModal";
import { queryClient } from "../../Utils/ReactQueryConfig";
import { IoMdAdd } from "react-icons/io";
import { AddSchoolModal } from "./components/AddSchoolModal";

export const SchoolManagement = () => {
  const [filter, setFilter] = useState<string>("");
  const searchFilter = useDebounce(filter);

  const { data, isLoading } = SchoolQueries.getAllSchools({
    refetchInterval: 10_000,
  });

  const [selectedSchoolId, setSelectedSchoolId] = useState<number | undefined>(
    undefined
  );
  const selectedSchool = data?.find(school => school.schoolId === selectedSchoolId);

  const editModal = useDisclosure();
  const removeModal = useDisclosure();
  const addModal = useDisclosure();

  const columns = useGetColumns();
  const rows = useMemorizedSchoolsData(data, searchFilter);
  const renderCell = useCustomTableCells(
    setSelectedSchoolId, [
    { modal: editModal, buttonProps: defaultEditButtonProps },
    { modal: removeModal, buttonProps: defaultRemoveButtonProps }]
  );

  const { mutateAsync: removeSchool } = SchoolQueries.removeSchool({
    onSuccess: async () =>
      await queryClient.invalidateQueries(["schools"]),
  });

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder="Wyszukiwarka"
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>
      <div>
        {isLoading ? 
          <Loading isLoading={isLoading}/> :
          <TableComponent columns={columns} rows={rows} tableCells={renderCell}/>
        }
      </div>
      {selectedSchool &&
        <>
          <YesNoModal header="Usuwanie szkoły" modal={removeModal} onYes={async () => removeSchool(Number(selectedSchoolId))} key={`remove-${selectedSchoolId}`}>
            <div className="flex flex-col gap-2">
              <div>{selectedSchool.name + " (" + selectedSchool.acronym + ")"}</div>
              <div>{selectedSchool.city}</div>
            </div>
          </YesNoModal>
          <EditSchoolModal school={selectedSchool} modal={editModal} key={`edit-${selectedSchoolId}`}/>
        </>
      }
      <AddSchoolModal modal={addModal} key={`add`}/>
      <div className="fixed right-10 bottom-10">
        <Button
          isIconOnly
          endContent={<IoMdAdd />}
          onPress={addModal.onOpen}
          className="rounded-[50%] bg-main-default w-[100px] h-[100px] text-[60px] fixed right-5 bottom-5"
        />
      </div>
    </div>
  );
};
