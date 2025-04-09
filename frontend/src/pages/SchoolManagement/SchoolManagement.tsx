import "./schoolManagement.css";
import { useState } from "react";
import { SchoolQueries } from "../../queries/schoolQuery";
import { Button, Input, useDisclosure } from "@heroui/react";
import { useDebounce } from "../../Utils/debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";
import {
  defaultAddButtonProps,
  defaultEditButtonProps,
  defaultRemoveButtonProps,
  defaultVariant,
} from "../../Utils/globalUtils";
import { EditSchoolModal } from "./components/EditSchoolModal";
import { useCustomTableCells } from "../../components/CustomTableCells/CustomTableCells";
import {
  useGetClassesColumns,
  useGetClassRows,
  useGetColumns,
  useMemorizedSchoolsData,
} from "./SchoolManagementUtils";
import { TableComponent } from "../../components/Table/TableComponent";
import { YesNoModal } from "../../components/YesNoModal/YesNoModal";
import { IoMdAdd } from "react-icons/io";
import { AddSchoolModal } from "./components/AddSchoolModal";
import { inputConfig } from "../../configs/inputConfig";
import { ClassQueries } from "../../queries/classQuery";
import { AddClassModal } from "./components/AddClassModal";
import { EditClassModal } from "./components/EditClassModal";

export const SchoolManagement = () => {
  const [filter, setFilter] = useState<string>("");
  const searchFilter = useDebounce(filter);

  const { data: schools } = SchoolQueries.getAllSchools();
  const { data: classes } = ClassQueries.getAllClasses();

  const [selectedSchoolId, setSelectedSchoolId] = useState<number | undefined>(
    undefined
  );
  const selectedSchool = schools?.find(
    (s) => s.schoolId === selectedSchoolId
  );
  const [selectedClassId, setSelectedClassId] = useState<number | undefined>(
    undefined
  );
  const selectedClass = classes?.find(
    (c) => c.classId === selectedClassId
  );
  const [selectedRow, setSelectedRow] = useState<number | undefined>(undefined);
  const selectedRowSchool = schools?.find(
    (s) => s.schoolId === selectedRow
  )

  const addSchoolModal = useDisclosure();
  const editSchoolModal = useDisclosure();
  const removeSchoolModal = useDisclosure();

  const addClassModal = useDisclosure();
  const editClassModal = useDisclosure();
  const removeClassModal = useDisclosure();

  const columns = useGetColumns();
  const rows = useMemorizedSchoolsData(schools, searchFilter);
  const renderSchoolCells = useCustomTableCells(setSelectedSchoolId, [
    { modal: addClassModal, buttonProps: defaultAddButtonProps },
    { modal: editSchoolModal, buttonProps: defaultEditButtonProps },
    { modal: removeSchoolModal, buttonProps: defaultRemoveButtonProps },
  ]);

  const renderClassCells = useCustomTableCells(setSelectedClassId, [
    { modal: editClassModal, buttonProps: defaultEditButtonProps },
    { modal: removeClassModal, buttonProps: defaultRemoveButtonProps },
  ]);

  const { mutateAsync: removeSchool } = SchoolQueries.removeSchool();
  const { mutateAsync: removeClass } = ClassQueries.removeClass();


  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder="Wyszukiwarka"
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          {...inputConfig}
        />
      </div>
      <div className="flex gap-3 w-full">
        <div className={`${selectedRow ? "w-2/3" : "w-full"} duration-300 ease-in-out transition-all`}>
          <TableComponent
            columns={columns}
            rows={rows}
            tableCells={renderSchoolCells}
            onSelectionChange={(e) => {
              if (e === "all" || e.size === 0) {
                setSelectedRow(undefined);
              } else {
                const numberSelected = Number(Array.from(e)[0]);
                if (!isNaN(numberSelected)) {
                  setSelectedRow(numberSelected);
                }
              }
            }}
          />
        </div>
        <div className={`${selectedRow ? "w-1/3" : "w-0"} duration-300 ease-in-out transition-all`}>
          <TableComponent
            columns={useGetClassesColumns()}
            rows={useGetClassRows(classes, selectedRow)}
            tableCells={renderClassCells}
          />
        </div>
      </div>
      {selectedSchool && (
        <>
          <YesNoModal
            header="Usuwanie szkoły"
            modal={removeSchoolModal}
            onYes={async () => await removeSchool(Number(selectedSchoolId))}
            key={`remove-${selectedSchoolId}`}
          >
            <div className="flex flex-col gap-2">
              <div>
                {selectedSchool.name + " (" + selectedSchool.acronym + ")"}
              </div>
              <div>{selectedSchool.city}</div>
            </div>
          </YesNoModal>
          <EditSchoolModal
            school={selectedSchool}
            modal={editSchoolModal}
            key={`edit-${selectedSchoolId}`}
          />
        </>
      )}
      {selectedClass && (
        <>
          <YesNoModal
            header="Usuwanie klasy"
            modal={removeClassModal}
            onYes={async () => await removeClass(Number(selectedClassId))}
            key={`remove-${selectedClassId}`}
          >
            <div className="flex flex-col gap-2">
              <div>
                {selectedClass.name}
              </div>
            </div>
          </YesNoModal>
          <EditClassModal
            _class={selectedClass}
            modal={editClassModal}
            key={`edit-${selectedClassId}`}
          />
        </>
      )}
      {selectedRowSchool && (
          <AddClassModal school={selectedRowSchool} modal={addClassModal} key={`add-class`} />
      )}
      <AddSchoolModal modal={addSchoolModal} key={`add-school`} />
      <div className="fixed right-10 bottom-10">
        <Button
          isIconOnly
          endContent={<IoMdAdd />}
          onPress={addSchoolModal.onOpen}
          className="rounded-[50%] bg-main-default w-[100px] h-[100px] text-[60px] fixed right-5 bottom-5"
        />
      </div>
    </div>
  );
};
