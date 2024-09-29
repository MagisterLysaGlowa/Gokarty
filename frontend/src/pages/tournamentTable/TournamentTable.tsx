import { useQuery } from "react-query";
import "./tournamentTable.css";
import { get_tournament_best_full_rides } from "../../services/ride";
import { useParams } from "react-router-dom";

const TournamentTable = () => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useQuery(
    "getTableForTurnament",
    async () => await get_tournament_best_full_rides(Number(id))
  );

  function formatTime(totalMilliseconds: number): string {
    const date = new Date(totalMilliseconds);
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = date.getUTCSeconds();
    const milliseconds = date.getUTCMilliseconds();
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(3, '0')}`;
  }

  return isLoading || isFetching ? (
    <p>Loading...</p>
  ) : (
    <div className="p-3">
      <table className="table table-striped text-center">
        <thead className="table-dark">
          <tr>
            <th>Lp.</th>
            <th>Imie</th>
            <th>Nazwisko</th>
            <th>Szkoła</th>
            <th>Czas</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((element, index) => (
            <tr>
              <td>{index + 1}</td>
              <td>{element.player.name}</td>
              <td>{element.player.surname}</td>
              <td>{element.player.school.acronym}</td>
              <td>{formatTime(element.time)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default TournamentTable;