import { useParams } from "react-router-dom";
import "./tournamentEdit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import { get_tournament, update_tournament } from "../../services/tournament";
import { useState } from "react";
import { TournamentData, TournamentFormData } from "../../../types";

const TournamentEdit = () => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    SetTournament({
      ...tournament,
      [name]: value,
    });
  };
  const { id } = useParams();
  const [tournament, SetTournament] = useState<TournamentData>(
    {} as TournamentData
  );
  const { isLoading, isFetching } = useQuery(
    "editTournament",
    async () => get_tournament(Number(id)),
    {
      onSuccess: (res) => {
        console.log(res.startDate);
        SetTournament({
          ...res,
          endDate: new Date(res.endDate),
          startDate: new Date(res.startDate),
        });
      },
    }
  );

  const mutate = useMutation(
    (data: TournamentFormData) => update_tournament(Number(id), data),
    {
      onSuccess: () => {
        console.log(1);
      },
      onError: () => {
        console.log(2);
      },
    }
  );

  if (isLoading || isFetching) return;
  return (
    <div className="p-5">
      <div className="editTournamentForm">
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="name">Nazwa</label>
            <input
              type="text"
              className="form-control"
              placeholder="nazwa"
              id="name"
              value={tournament?.name}
              name="name"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="startDate">Data rozpoczęcia</label>
            <input
              type="date"
              className="startDate form-control"
              id="startDate"
              name="startDate"
              value={new Date(tournament.startDate).toISOString().split("T")[0]}
              onChange={(e) => {
                console.log(new Date(e.target.value));

                SetTournament((prev) => ({
                  ...prev,
                  startDate: new Date(e.target.value),
                }));
              }}
            />
          </div>
          <div>
            <label htmlFor="endDate">Data zakończenia</label>
            <input
              type="date"
              className="endDate form-control"
              id="endDate"
              name="endDate"
              value={new Date(tournament.endDate).toISOString().split("T")[0]}
              onChange={(e) => {
                SetTournament((prev) => ({
                  ...prev,
                  endDate: new Date(e.target.value),
                }));
              }}
            />
          </div>
          <button
            className="btn btn-primary"
            onClick={() => {
              mutate.mutate(tournament);
            }}
          >
            Zatwierdź
          </button>
        </form>
      </div>
      <div className="playersEditSection">
        <h3>Uczestnicy</h3>
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Lp</th>
              <th>Imie</th>
              <th>Nazwisko</th>
              <th>Data urodzenia</th>
              <th>Szkoła</th>
              <th>Edytuj</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Maciej</td>
              <td>Traktor</td>
              <td>18.02.1999</td>
              <td>ZSITO</td>
              <td>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button className="btn btn-danger">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Maciej</td>
              <td>Traktor</td>
              <td>18.02.1999</td>
              <td>ZSITO</td>
              <td>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button className="btn btn-danger">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
            <tr>
              <td>1</td>
              <td>Maciej</td>
              <td>Traktor</td>
              <td>18.02.1999</td>
              <td>ZSITO</td>
              <td>
                <button className="btn btn-primary">
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
              <td>
                <button className="btn btn-danger">
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TournamentEdit;
