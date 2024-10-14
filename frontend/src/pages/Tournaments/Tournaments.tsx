import { useEffect, useState } from "react";
import { TournamentListElement } from "../../components/componentsExport";
import "./tournaments.css";
import {
  create_tournament,
  get_all_tournaments,
} from "../../services/tournament";
import { TournamentFormData } from "../../../types";
import { useQuery, useMutation } from "react-query";
import {
  createTournamentTexts,
  promiseToast,
} from "../../Utils/ToastNotifications";
import { tournamentValidate } from "../../validations/TournamentValidation";
import { addTournamentToList, resetTournamentValues } from "./TournamentUtils";

const Tournaments = () => {
  const [tournament, SetTournament] = useState<TournamentFormData>(
    resetTournamentValues
  );

  const { data, isLoading, isFetching } = useQuery(
    "getTournaments",
    async () => await get_all_tournaments()
  );

  const { mutateAsync: createTournamentAsync } = useMutation(
    async (data: TournamentFormData) =>
      await promiseToast(create_tournament(data), createTournamentTexts),
    {
      onSuccess: async (tournament) => addTournamentToList(tournament),
    }
  );

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

  return (
    <div className="d-flex">
      <div className="w-75">
        <div className="tournamentList">
          {isLoading || isFetching ? (
            <p>Loading...</p>
          ) : (
            data?.map((z) => (
              <TournamentListElement data={z} key={z.tournamentId} />
            ))
          )}
        </div>
      </div>
      <div className="w-25 right" style={{ margin: "5px" }}>
        <form
          className="d-flex flex-column tournamentForm"
          style={{ gap: "10px" }}
          onSubmit={(e) => e.preventDefault()}
        >
          <h4 className="text-center">Dodaj turniej</h4>
          <input
            type="text"
            className="form-control"
            placeholder="nazwa"
            onChange={(e) => {
              SetTournament({ ...tournament, name: e.target.value });
            }}
          />
          <input
            type="date"
            className="form-control"
            placeholder="nazwa"
            onChange={(e) =>
              SetTournament({
                ...tournament,
                startDate: new Date(e.target.value),
              })
            }
          />
          <button
            className="btn btn-dark"
            onClick={async () => {
              if (await tournamentValidate(tournament))
                await createTournamentAsync(tournament);
            }}
          >
            Dodaj
          </button>
        </form>
      </div>
    </div>
  );
};
export default Tournaments;
