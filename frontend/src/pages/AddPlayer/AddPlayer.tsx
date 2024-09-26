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

export const AddPlayer = () => {
  const [player, SetPlayer] = useState<PlayerData>(resetPlayerData());
  const navigate = useNavigate();
  const { id, playerId } = useParams();

  const updatePlayerMutation = useMutation(
    async (player: PlayerData) => await update_player(player.playerId, player),
    {
      onSuccess: async () => {
        console.log(1);
        navigate(`/zawody/edycja/${id}`);
      },
      onError: () => {
        console.log(2);
      },
    }
  );

  useQuery("getPlayer", async () => await get_player(Number(playerId)), {
    onSuccess: (res) => {
      if (res) SetPlayer(res);
      else SetPlayer(resetPlayerData());
    },
  });

  const createPlayerMutate = useMutation(
    async (data: PlayerData) => await create_player(Number(id), data),
    {
      onSuccess: async () => {
        console.log(1);
        navigate(`/zawody/edycja/${id}`);
      },
      onError: () => {
        console.log(2);
      },
    }
  );

  const {
    data: schools,
    isLoading: schoolLoading,
    isFetching: schoolfetching,
  } = useQuery("getSchools", async () => await get_all_schools());
  return (
    <div className="playerContainer p-5">
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
                else if (playerId)
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
  );
};
