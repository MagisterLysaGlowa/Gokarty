import { useEffect, useState } from "react";
import { TournamentListElement } from "../../components/componentsExport";
import "./tournaments.css";
import { TournamentFormData } from "../../../types";
import { resetTournamentValues } from "./TournamentUtils";
import { TournamentQueries } from "../../queries/tournamentQuery";
import { Button, useDisclosure } from "@heroui/react";
import { IoMdAdd } from "react-icons/io";
import { PageHeader } from "../../components/PageHeader/PageHeader";
import { CreateTournamentModal } from "./TournamentCreateModal";

const Tournaments = () => {
  const [tournament, SetTournament] = useState<TournamentFormData>(
    resetTournamentValues
  );

  const { data } = TournamentQueries.getAllTournaments();

  const { mutateAsync: createTournamentAsync } =
    TournamentQueries.createTournament();

  /*
    Ustawia date zakończenia zawodów na date rozpoczęcia zawodów
    gdy tworzysz zawody. Wynika to z walidacji dat turnieju gdzie 
    data końca nie może być mniejsza niż data startu.
  */

  useEffect(() => {
    const changeEndDate = () => {
      SetTournament((prev) => ({ ...prev, endDate: prev.startDate }));
    };
    changeEndDate();
  }, [tournament.startDate]);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div className="flex page gap-2 flex-col h-screen overflow-hidden">
      <PageHeader />
      <div className="flex-1 overflow-y-auto">
        <div className="grid 2xl:grid-cols-3 gap-3 xl:grid-cols-2 py-4">
          {data?.map((z) => (
            <TournamentListElement data={z} key={z.tournamentId} />
          ))}
        </div>
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
