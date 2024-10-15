import { useEffect, useState } from "react";
import "./AddExistingPlayerToTournament.css";
import { PlayerData, PlayerFilterFormData } from "../../../types";
import { useMutation, useQuery } from "react-query";
import { get_all_schools } from "../../services/school";
import {
  add_player_to_tournament,
  filter_players,
} from "../../services/player";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { queryClient } from "../../Utils/ReactQueryConfig";
import { useModal } from "../../components/Modal/useModal";
import { buildButton } from "../../components/Modal/Utils";
export const AddExistingPlayerToTournament = () => {
  const modal = useModal();
  const { id } = useParams();
  const [playerFilter, SetPlayerFilter] = useState<PlayerFilterFormData>({
    name: "",
    schoolId: -1,
    surname: "",
    tournamentId: Number(id),
  });

  const {
    data: schools,
    isLoading: schoolsLoading,
    isFetching: schoolFetching,
  } = useQuery("schools", async () => await get_all_schools());

  const { data: players, refetch: filterRefetch } = useQuery(
    "filterPlayers",
    async () => await filter_players(playerFilter)
  );

  const { mutateAsync: addPlayerToTournament } = useMutation(
    async (playerId: number) =>
      await add_player_to_tournament(Number(id), playerId),
    {
      onSuccess: (res) => {
        queryClient.setQueryData(
          "filterPlayers",
          (prev: PlayerData[] | undefined) => {
            return prev ? prev.filter((z) => z.playerId != res) : [];
          }
        );
      },
    }
  );

  useEffect(() => {
    filterRefetch();
    console.log(playerFilter);
  }, [playerFilter, filterRefetch]);

  return (
    <div className="p-3">
      <h3>Wyszukiwarka</h3>
      <div style={{ width: "300px" }} className="d-flex flex-column gap-3">
        <div>
          <label htmlFor="">Imie</label>
          <input
            type="text"
            className="form-control"
            placeholder="Imie"
            onChange={(e) =>
              SetPlayerFilter({ ...playerFilter, name: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="">Nazwisko</label>
          <input
            type="text"
            name=""
            id=""
            className="form-control"
            placeholder="Nazwisko"
            onChange={(e) =>
              SetPlayerFilter({ ...playerFilter, surname: e.target.value })
            }
          />
        </div>
        <div>
          <label htmlFor="">Szkoła</label>
          {!schoolFetching && !schoolsLoading ? (
            <select
              className="form-control"
              onChange={(e) =>
                SetPlayerFilter({
                  ...playerFilter,
                  schoolId: Number(e.target.value),
                })
              }
            >
              <option value="-1" selected disabled>
                Wybierz Szkole
              </option>
              {schools?.map((school) => (
                <option value={school.schoolId}>{school.name}</option>
              ))}
            </select>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
      <table className="table table-striped text-center align-middle my-3">
        <thead className="table-dark">
          <tr>
            <th>LP.</th>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Szkoła</th>
            <th>Dodaj</th>
          </tr>
        </thead>
        <tbody>
          {players?.map((player, index) => (
            <tr className="text-center">
              <td>{index + 1}</td>
              <td>{player.name}</td>
              <td>{player.surname}</td>
              <td>{player.school.acronym}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={async () =>
                    modal.openModal({
                      title: "Dodanie do zawodów",
                      content: `Czy napewno chcesz dodać: ${
                        player.name + " " + player.surname
                      } do zawodów?`,
                      buttons: [
                        buildButton("btn btn-secondary", "Nie"),
                        buildButton(
                          "btn btn-primary",
                          "Tak",
                          async () =>
                            await addPlayerToTournament(player.playerId)
                        ),
                      ],
                    })
                  }
                >
                  <FontAwesomeIcon icon={faPlus} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
