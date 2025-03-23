import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  schoolOrder,
  handleChange,
} from "../TournamentEdit/TournamentEditUtils";
import { useState } from "react";
import { PlayerData } from "../../../types";
import { useNavigate, useParams } from "react-router-dom";
import "./AddPlayer.css";
import { errorToast } from "../../Utils/ToastNotifications";
import { validatePlayer } from "../../validations/PlayerValidation";
import { resetPlayerValues } from "./AddPlayerUtils";
import { PlayerQueries } from "../../queries/playerQuery";
import { SchoolQueries } from "../../queries/schoolQuery";
import { convertDateToInputValue } from "../../Utils/globalUtils";

export const AddPlayer = () => {
  const [player, SetPlayer] = useState<PlayerData>(resetPlayerValues);
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const { id, playerId } = useParams();
  const navigate = useNavigate();

  const { mutateAsync: updatePlayer } = PlayerQueries.updatePlayer();

  const { isLoading: isLoadingPlayer, isFetching: isFetchingPlayer } =
    PlayerQueries.getPlayer(Number(playerId), {
      onSuccess: (res) => SetPlayer(res),
    });

  const { mutateAsync: createPlayer } = PlayerQueries.createPlayer({
    onSuccess: () => {
      SetPlayer(resetPlayerValues);
      setCheckbox(false);
    },
  });

  const { data: schools } = SchoolQueries.getAllSchools();

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
              value={convertDateToInputValue(player.birthDate)}
              onChange={(e) => {
                handleChange(e, SetPlayer);
              }}
            />
          </div>
          <div>
            <label htmlFor="school">Szkoła</label>
            <div className="d-flex" style={{ gap: "5px" }}>
              <select
                name="schoolId"
                id="school"
                className="form-control"
                defaultValue={player.schoolId}
                onChange={(e) => handleChange(e, SetPlayer)}
              >
                <option value="-1" disabled>
                  Wybierz szkołe
                </option>
                {schools
                  ?.sort((a, b) => schoolOrder(a, b))
                  .map((z) => (
                    <option value={z.schoolId} key={z.name}>
                      {z.acronym}
                    </option>
                  ))}
              </select>
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
              onClick={async () => {
                if (!(await validatePlayer(player))) return;

                if (player.playerId == -1) {
                  if (checkbox)
                    await createPlayer({
                      tournamentId: Number(id),
                      data: player,
                    });
                  else errorToast("Zapoznaj się z regulaminem");
                } else if (playerId) {
                  await updatePlayer({
                    playerId: player.playerId,
                    data: player,
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
