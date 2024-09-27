import { useState } from "react";
import { TournamentListElement } from "../../components/componentsExport";
import "./tournaments.css";
import {
  create_tournament,
  get_all_tournaments,
} from "../../services/tournament";
import { TournamentFormData } from "../../../types";
import { useQuery, useMutation } from "react-query";
import { promiseToast } from "../../Utils/ToastNotifications";

const Tournaments = () => {
  const [tournament, SetTournament] = useState<TournamentFormData>({
    name: "",
    endDate: new Date(),
    startDate: new Date(),
    tournamentStateId: 1,
  });

  const {
    data,
    isLoading,
    isFetching,
    refetch: refetchTournament,
  } = useQuery("tournament", async () => await get_all_tournaments());

  const { mutateAsync: createTournamentAsync } = useMutation(
    async (data: TournamentFormData) =>
      await promiseToast(create_tournament(data), {
        error: "Błąd podczas dodawania turnieju",
        pending: "W trakcie dodawania turnieju",
        success: "Pomyślnie dodano turniej",
      }),
    {
      onSuccess: async () => {
        await refetchTournament();
      },
    }
  );

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
      <div className="w-25 right" style={{ padding: "5px" }}>
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
              createTournamentAsync(tournament);
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
