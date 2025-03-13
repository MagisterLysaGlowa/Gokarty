import { useEffect, useState } from "react";
import "./AddExistingPlayerToTournament.css";
import { PlayerFilterFormData } from "../../../types";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { PlayerQueries } from "../../queries/playerQuery";
import { SchoolQueries } from "../../queries/schoolQuery";
import { queryClient } from "../../Utils/ReactQueryConfig";

export const AddExistingPlayerToTournament = () => {
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
  } = SchoolQueries.getAllSchools();

  const { data: players, refetch: filterRefetch } =
    PlayerQueries.filterPlayers(playerFilter);

  const { mutateAsync: addPlayerToTournament } =
    PlayerQueries.addPlayerToTournament({
      onSuccess: () => {
        queryClient.invalidateQueries(["playersfilter", playerFilter]);
      },
    });

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
                <button className="btn btn-primary">
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
