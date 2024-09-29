import { useQuery } from "react-query";
import "./tournamentTable.css";
import { get_tournament_best_full_rides } from "../../services/ride";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { convertTimeToString } from "../../Utils/TimeUtils";

const TournamentTable = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useQuery(
    "getTableForTurnament",
    async () => await get_tournament_best_full_rides(Number(id))
  );
  const navigate = useNavigate();

  return isLoading || isFetching ? (
    <p>Loading...</p>
  ) : (
    <div className="p-3">
      <table className="table table-striped text-center align-middle">
        <thead className="table-dark">
          <tr>
            <th>Lp.</th>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Szkoła</th>
            <th>Czas</th>
            <th>Edytuj</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((element, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{element.player.name}</td>
              <td>{element.player.surname}</td>
              <td>{element.player.school.acronym}</td>
              <td>{convertTimeToString(element.time)}</td>
              <td>
                <button
                  className="btn btn-primary"
                  onClick={() => navigate(`/przejazd/${element.rideId}/edytuj`)}
                >
                  <FontAwesomeIcon icon={faEdit} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TournamentTable;
