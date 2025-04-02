import "./tournaments.css";
import { Button, useDisclosure } from "@heroui/react";
import { IoMdAdd } from "react-icons/io";
import { CreateTournamentModal } from "./TournamentCreateModal";
import { TournamentsListContainer } from "./tournamentsComponents/TournamentsListContainer";

const Tournaments = () => {
  const addModal = useDisclosure();

  return (
    <div className="flex gap-2 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto px-3">
        <TournamentsListContainer />
      </div>
      <CreateTournamentModal
        key={`add`}
        modal={addModal}
      />
      <Button
        isIconOnly
        className="rounded-[50%] bg-main-default w-[100px] h-[100px] text-[60px] fixed right-10 bottom-5 z-10"
        size="lg"
        endContent={<IoMdAdd />}
        onPress={addModal.onOpen}
      />
    </div>
  );
};
export default Tournaments;
