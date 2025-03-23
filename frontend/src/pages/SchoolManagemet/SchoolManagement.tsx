import "./schoolManagement.css";
import { useState } from "react";
import { SchoolQueries } from "../../queries/schoolQuery";
import { SchoolsTable } from "./SchoolManagementComponents/SchoolsTable";
import { Input, useDisclosure } from "@heroui/react";
import { Loading } from "../../components/Loading/Loading";
import { useDebounce } from "../../Utils/debounce";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { defaultVariant } from "../../Utils/globalUtils";
import { RemoveSchoolsModal } from "./SchoolManagementComponents/RemoveSchoolModal";
import { EditSchoolModal } from "./SchoolManagementComponents/EditSchoolModal";

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
          <SchoolsTable editModal={editModal} removeModal={removeModal} data={data} setSelectedSchool={setSelectedSchoolId} searchFilter={searchFilter}/>
        }
      </div>
      {selectedSchool &&
        <>
          <RemoveSchoolsModal school={selectedSchool} modal={removeModal}/>
          <EditSchoolModal school={selectedSchool} modal={editModal}/>
        </>
      }
    </div>
  );
};
