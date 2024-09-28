import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  compareFunction,
  handleChange,
  resetPlayerData,
} from "../TournamentEdit/TournamentEditUtils";
import { useState } from "react";
import { PlayerData } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "react-query";
import {
  create_player,
  get_player,
  update_player,
} from "../../services/player";
import { get_all_schools } from "../../services/school";
import "./AddPlayer.css";
import { promiseToast } from "../../Utils/ToastNotifications";

export const AddPlayer = () => {
  const [player, SetPlayer] = useState<PlayerData>(resetPlayerData());
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const { id, playerId } = useParams();
  const navigate = useNavigate();

  const updatePlayerMutation = useMutation(
    async (player: PlayerData) =>
      await promiseToast(update_player(player.playerId, player), {
        error: "Błąd podczas aktualizacji zawodnika",
        pending: "W trakcie aktualizacji zawodnika",
        success: "Pomyślnie uaktualniono zawodnika",
      }),
    {
      onSuccess: async () => {
        navigate(-1);
      },
    }
  );

  const { isLoading: isLoadingPlayer, isFetching: isFetchingPlayer } = useQuery(
    "getPlayer",
    async () => (playerId ? await get_player(Number(playerId)) : null),
    {
      onSuccess: (res) => {
        console.log(res);
        SetPlayer(res ?? resetPlayerData());
      },
    }
  );

  const createPlayerMutate = useMutation(
    async (data: PlayerData) =>
      await promiseToast(create_player(Number(id), data), {
        error: "Błąd podczas tworzenia zawodnika",
        pending: "W trakcie tworzenia zawodnika",
        success: "Pomyślnie utworzono zawodnika",
      }),
    {
      onSuccess: async () => {
        navigate(-1);
      },
    }
  );

  const {
    data: schools,
    isLoading: schoolLoading,
    isFetching: schoolfetching,
  } = useQuery("getSchools", async () => await get_all_schools());

  if (isLoadingPlayer || isFetchingPlayer) return <p>Loading...</p>;
  return (
    <div className="playerContainer p-5">
      <div className="editPlayerForm">
        <h3>
          {!player?.playerId || player.playerId == -1
            ? "Dodaj gracza"
            : "Edytuj gracza"}
        </h3>
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
                  <option value="-1" disabled selected>
                    Wybierz szkołe
                  </option>
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
          {(!player?.playerId || player.playerId == -1) && (
            <div className="checkbox">
              <input
                type="checkbox"
                id="statute"
                checked={checkbox}
                onChange={(e) => {
                  setCheckbox(e.target.checked);
                }}
              />
              <label htmlFor="statute">
                Zapoznałem się i akceptuję regulamin
              </label>
            </div>
          )}
          <div className="d-flex" style={{ gap: "10px" }}>
            <button
              className="btn btn-primary"
              onClick={() => {
                if (!player?.playerId || player.playerId == -1) {
                  if (checkbox) {
                    createPlayerMutate.mutate(player);
                    setCheckbox(false);
                  } else {
                    console.log("kliknij checkboxa");
                  }
                } else if (playerId) {
                  updatePlayerMutation.mutate({
                    ...player,
                    birthDate: new Date(player.birthDate),
                  });
                }
              }}
            >
              Zatwierdź
            </button>
            <button
              className="btn btn-danger"
              onClick={() => {
                SetPlayer((prev) => ({
                  ...prev,
                  birthDate: new Date(),
                  name: "",
                  surname: "",
                  schoolId: -1,
                }));
              }}
            >
              Wyczyść formularz
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
