import { useState } from "react";
import { TournamentListElement } from "../../components/componentsExport";
import "./tournaments.css";

interface Tournament {
  Name: string;
  Date: Date;
}

const Tournaments = () => {
  const [tournament, SetTournament] = useState<Tournament>({
    Date: new Date(),
    Name: "",
  });

  return (
    <div className="d-flex">
      <div className="w-75">
        <div className="tournamentList">
          <TournamentListElement />
          <TournamentListElement />
          <TournamentListElement />
          <TournamentListElement />
          <TournamentListElement />
        </div>
      </div>
      <div className="w-25 right" style={{ padding: "5px" }}>
        <form
          className="d-flex flex-column tournamentForm"
          style={{ gap: "10px" }}
        >
          <h4 className="text-center">Dodaj turniej</h4>
          <input
            type="text"
            className="form-control"
            placeholder="nazwa"
            onChange={(e) => {
              SetTournament({ ...tournament, Name: e.target.value });
              console.log(tournament);
            }}
          />
          <input
            type="date"
            className="form-control"
            placeholder="nazwa"
            onChange={(e) =>
              SetTournament({ ...tournament, Date: new Date(e.target.value) })
            }
          />
          <button
            className="btn btn-dark"
            onClick={() => {
              //Wywylanie
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
