import { useState } from "react";
import "./tournaments.css";
import { TournamentFormData } from "../../../types";
import { resetTournamentValues } from "./TournamentUtils";
import { TournamentQueries } from "../../queries/tournamentQuery";
import { Button, useDisclosure } from "@heroui/react";
import { IoMdAdd } from "react-icons/io";
import { CreateTournamentModal } from "./TournamentCreateModal";
import { TournamentsListContainer } from "./tournamentsComponents/TournamentsListContainer";

const Tournaments = () => {
  const [tournament, SetTournament] = useState<TournamentFormData>(
    resetTournamentValues
  );

  const { mutateAsync: createTournamentAsync } =
    TournamentQueries.createTournament();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex gap-2 flex-col overflow-hidden">
      <div className="flex-1 overflow-y-auto">
        <TournamentsListContainer />
      </div>
      <CreateTournamentModal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        setTournament={SetTournament}
        tournament={tournament}
        createTournamentAsync={createTournamentAsync}
      />
      <Button
        isIconOnly
        className="rounded-[50%] bg-main-default w-[100px] h-[100px] text-[60px] fixed right-5 bottom-5"
        size="lg"
        endContent={<IoMdAdd />}
        onPress={onOpen}
      />
    </div>
  );
};
export default Tournaments;
