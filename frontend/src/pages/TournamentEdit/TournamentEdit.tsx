import { useNavigate, useParams } from "react-router-dom";
import "./tournamentEdit.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useQuery, useMutation } from "react-query";
import { get_tournament, update_tournament } from "../../services/tournament";
import { useState } from "react";
import { PlayerData, TournamentData, TournamentFormData } from "../../../types";
import {
  create_player,
  get_players_for_tournament,
  remove_player,
  update_player,
} from "../../services/player";
import { get_all_schools } from "../../services/school";
import {
  compareFunction,
  handleChange,
  resetPlayerData,
} from "./TournamentEditUtils";

const TournamentEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, SetTournament] = useState<TournamentData>(
    {} as TournamentData
  );
  const [player, SetPlayer] = useState<PlayerData>(resetPlayerData());

  const [selectedPlayer, SetSelectedPlayer] = useState<PlayerData | null>(null);

  const { isLoading, isFetching } = useQuery(
    "editTournament",
    async () => await get_tournament(Number(id)),
    {
      onSuccess: (res) => {
        SetTournament({
          ...res,
          endDate: new Date(res.endDate),
          startDate: new Date(res.startDate),
        });
      },
    }
  );
  const {
    data: schools,
    isLoading: schoolLoading,
    isFetching: schoolfetching,
  } = useQuery("getSchools", async () => await get_all_schools());

  const {
    data: tournamentPlayers,
    isLoading: tournamentPlayersLoading,
    isFetching: tournamentPlayerFetching,
    refetch: refetchPlayers,
  } = useQuery(
    "tournamentPlayers",
    async () => await get_players_for_tournament(Number(id))
  );

  const updateTournamentMutate = useMutation(
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

  const createPlayerMutate = useMutation(
    async (data: PlayerData) => await create_player(Number(id), data),
    {
      onSuccess: async () => {
        await refetchPlayers();
      },
      onError: () => {},
    }
  );

  const deletePlayerMutate = useMutation(
    async (id: number) => await remove_player(id),
    {
      onSuccess: async () => {
        console.log(1);
        await refetchPlayers();
      },
      onError: () => {},
    }
  );

  const updatePlayerMutation = useMutation(
    async (player: PlayerData) => await update_player(player.playerId, player),
    {
      onSuccess: async () => {
        console.log(1);
        await refetchPlayers();
      },
      onError: () => {
        console.log(2);
      },
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
              <label htmlFor="startDate">Data rozpoczęcia</label>
              <input
                type="date"
                className="startDate form-control"
                id="startDate"
                name="startDate"
                value={
                  new Date(tournament.startDate).toISOString().split("T")[0]
                }
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
                updateTournamentMutate.mutate(tournament);
              }}
            >
              Zatwierdź
            </button>
          </form>
        </div>
        <div className="editPlayerForm">
          <h3>Dodaj/Edytuj gracza</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div>
              <label htmlFor="playerName">Imie</label>
              <input
                name="name"
                type="text"
                id="playerName"
                className="form-control"
                value={player.name}
                onChange={(e) => handleChange(e, SetPlayer)}
              />
            </div>
            <div>
              <label htmlFor="playerSurname">Nazwisko</label>
              <input
                id="playerSurname"
                type="text"
                name="surname"
                className="form-control"
                value={player.surname}
                onChange={(e) => handleChange(e, SetPlayer)}
              />
            </div>
            <div>
              <label htmlFor="birthDate_">Data urodzenia</label>
              <input
                name="birthDate"
                type="date"
                id="birthDate_"
                className="form-control"
                value={
                  (player.birthDate ? new Date(player.birthDate) : new Date())
                    .toISOString()
                    .split("T")[0]
                }
                onChange={(e) => {
                  handleChange(e, SetPlayer);
                }}
              />
            </div>
            <div>
              <label htmlFor="school">Szkoła</label>
              <div className="d-flex" style={{ gap: "5px" }}>
                {schoolLoading || schoolfetching ? (
                  <p>Loading...</p>
                ) : (
                  <select
                    name="schoolId"
                    id="school"
                    className="form-control"
                    value={player.schoolId}
                    onChange={(e) => handleChange(e, SetPlayer)}
                  >
                    {schools
                      ?.sort((a, b) => compareFunction(a, b))
                      .map((z) => (
                        <option value={z.schoolId} key={z.name}>
                          {z.acronym}
                        </option>
                      ))}
                  </select>
                )}
                <button
                  className="btn btn-primary"
                  onClick={() => navigate("/szkoly")}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </div>
            </div>
            <div className="d-flex" style={{ gap: "10px" }}>
              <button
                className="btn btn-primary"
                onClick={() => {
                  if (!player?.playerId || player.playerId == -1)
                    createPlayerMutate.mutate(player);
                  else
                    updatePlayerMutation.mutate({
                      ...player,
                      birthDate: new Date(player.birthDate),
                    });

                  SetPlayer(resetPlayerData());
                }}
              >
                Zatwierdź
              </button>
              <button
                className="btn btn-danger"
                onClick={() => {
                  SetPlayer(resetPlayerData);
                }}
              >
                Wyczyść formularz
              </button>
            </div>
          </form>
        </div>
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
            {tournamentPlayersLoading || tournamentPlayerFetching ? (
              <tr>
                <td>Loading...</td>
              </tr>
            ) : (
              tournamentPlayers?.map((element, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{element.name}</td>
                  <td>{element.surname}</td>
                  <td>{new Date(element.birthDate).toLocaleDateString()}</td>
                  <td>{element.schoolId}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => SetPlayer(element)}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#exampleModal"
                      onClick={() => SetSelectedPlayer(element)}
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
      {/* Bootstrap modal */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Czy aby na pewno chcesz usunąć tego zawodnika?
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => SetSelectedPlayer(null)}
              />
            </div>
            <div className="modal-body">
              {selectedPlayer?.name + " " + selectedPlayer?.surname}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={() => SetSelectedPlayer(null)}
              >
                Nie
              </button>
              <button
                type="button"
                className="btn btn-primary"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={() => {
                  deletePlayerMutate.mutate(Number(selectedPlayer?.playerId));
                  SetSelectedPlayer(null);
                }}
              >
                Tak
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* {Bootstrap Modal} */}
    </div>
  );
};

export default TournamentEdit;
