import { useNavigate, useParams } from "react-router-dom";
import "./tournamentEdit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import {
  get_tournament,
  remove_tournament,
  update_tournament,
} from "../../services/tournament";
import { useState } from "react";
import { TournamentData, TournamentFormData } from "../../../types";
import {
  get_players_for_tournament_with_school,
  remove_player,
} from "../../services/player";
import {
  handleChange,
  tournamentStringFromState,
  updateTournamentState,
} from "./TournamentEditUtils";
import {
  promiseToast,
  removePlayerTexts,
  removeTournamentTexts,
  updateTournamentTexts,
} from "../../Utils/ToastNotifications";
import { useModal } from "../../Utils/Modal/useModal";
import { buildButton } from "../../Utils/Modal/Utils";

const TournamentEdit = () => {
  const modal = useModal();
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, SetTournament] = useState<TournamentData>(
    {} as TournamentData
  );

  const {
    isLoading,
    isFetching,
    refetch: refetchTournament,
  } = useQuery("editTournament", async () => await get_tournament(Number(id)), {
    onSuccess: (res) => {
      SetTournament({
        ...res,
        endDate: new Date(res.endDate),
        startDate: new Date(res.startDate),
      });
    },
  });

  const {
    data: tournamentPlayers,
    isLoading: tournamentPlayersLoading,
    isFetching: tournamentPlayerFetching,
    refetch: refetchPlayers,
  } = useQuery(
    "tournamentPlayers",
    async () => await get_players_for_tournament_with_school(Number(id))
  );

  const updateTournamentMutate = useMutation(
    async (data: TournamentFormData) =>
      await promiseToast(
        update_tournament(Number(id), data),
        updateTournamentTexts
      ),
    {
      onSuccess: () => refetchTournament(),
    }
  );

  const deletePlayerMutate = useMutation(
    async (id: number) =>
      await promiseToast(remove_player(id), removePlayerTexts),
    {
      onSuccess: async () => await refetchPlayers(),
    }
  );

  const { mutateAsync: deleteTournamentAsync } = useMutation(
    async () =>
      await promiseToast(
        remove_tournament(tournament.tournamentId),
        removeTournamentTexts
      ),
    {
      onSuccess: () => navigate(-1),
    }
  );

  if (isLoading || isFetching) return;
  return (
    <div className="p-5">
      <div className="d-flex justify-content-evenly">
        <div className="editTournamentForm">
          <h3>Edytuj dane turnieju</h3>
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
                onChange={(e) => handleChange(e, SetTournament)}
              />
            </div>
            <div>
              {tournament.tournamentStateId == 1 ? (
                <label htmlFor="startDate">Data planowanego rozpoczęcia</label>
              ) : (
                <label htmlFor="startDate">Data rozpoczęcia</label>
              )}
              <input
                type="date"
                className="startDate form-control"
                id="startDate"
                name="startDate"
                value={
                  new Date(tournament.startDate).toISOString().split("T")[0]
                }
                onChange={(e) => {
                  SetTournament((prev) => ({
                    ...prev,
                    startDate: new Date(e.target.value),
                  }));
                }}
              />
            </div>
            <div>
              {tournament.tournamentStateId != 1 && (
                <>
                  {tournament.tournamentStateId == 2 ? (
                    <label htmlFor="endDate">
                      Data planowanego zakończenia
                    </label>
                  ) : (
                    <label htmlFor="endDate">Data zakończenia</label>
                  )}
                  <input
                    type="date"
                    className="endDate form-control"
                    id="endDate"
                    name="endDate"
                    value={
                      new Date(tournament.endDate).toISOString().split("T")[0]
                    }
                    onChange={(e) => {
                      SetTournament((prev) => ({
                        ...prev,
                        endDate: new Date(e.target.value),
                      }));
                    }}
                  />
                </>
              )}
            </div>
            <button
              className="btn btn-primary"
              onClick={() => {
                updateTournamentMutate.mutate(tournament);
              }}
            >
              Zatwierdź
            </button>
          </form>
        </div>
        <div className="manageTournamentForm">
          <h3>Zarządzaj zawodami</h3>
          <div className="d-flex flex-column" style={{ gap: "10px" }}>
            {tournament.tournamentStateId != 3 && (
              <button
                type="button"
                className={`btn btn-${
                  tournament.tournamentStateId == 1 ? "primary" : "danger"
                }`}
                onClick={() =>
                  modal.openModal({
                    title: tournamentStringFromState(tournament),
                    content: tournament.name,
                    buttons: [
                      buildButton("btn btn-secondary", "Nie"),
                      buildButton(
                        "btn btn-primary",
                        "Tak",
                        async () =>
                          await updateTournamentState(
                            tournament,
                            updateTournamentMutate
                          )
                      ),
                    ],
                  })
                }
              >
                {tournament.tournamentStateId == 1 ? "Rozpocznij" : "Zakończ"}
              </button>
            )}
            {tournament.tournamentStateId == 3 && (
              <button className="btn btn-secondary disabled">
                Zawody zakończone
              </button>
            )}
            {tournament.tournamentStateId == 2 && (
              <button
                className="btn btn-primary"
                onClick={() => navigate(`/zawody/${id}/zarzadzanie`)}
              >
                Zarządzaj
              </button>
            )}
            <button
              className="btn btn-danger"
              onClick={() =>
                modal.openModal({
                  title: "Czy napewno chcesz usunąć zawody?",
                  content: tournament.name,
                  buttons: [
                    buildButton("btn btn-secondary", "Anuluj"),
                    buildButton("btn btn-primary", "Usuń", async () =>
                      deleteTournamentAsync()
                    ),
                  ],
                })
              }
            >
              Usuń
            </button>
          </div>
        </div>
      </div>
      <div className="playersEditSection">
        <div className="d-flex" style={{ gap: "10px" }}>
          <h3>Uczestnicy</h3>
          <button
            className="btn btn-primary"
            onClick={() => navigate(`/zawody/${id}/edycja/zawodnik`)}
          >
            Dodaj zawodnika
          </button>
        </div>
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
            {tournamentPlayersLoading || tournamentPlayerFetching ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              tournamentPlayers?.map((element, index) => (
                <tr key={element.playerId}>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.surname}</td>
                  <td>{new Date(element.birthDate).toLocaleDateString()}</td>
                  <td>{element.school.acronym}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(
                          `/zawody/${id}/edycja/zawodnik/${element.playerId}`
                        )
                      }
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      onClick={() =>
                        modal.openModal({
                          title: "Czy napewno chcesz usunąć zawodnika?",
                          content: element.name + " " + element.surname,
                          buttons: [
                            buildButton("btn btn-secondary", "Anuluj"),
                            buildButton("btn btn-primary", "Usuń", async () =>
                              deletePlayerMutate.mutateAsync(element.playerId)
                            ),
                          ],
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TournamentEdit;
