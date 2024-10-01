import { useQuery } from "react-query";
import "./tournamentTable.css";
import {
  get_tournament_best_full_rides,
  get_tournament_last_full_ride,
} from "../../services/ride";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { convertTimeToString } from "../../Utils/TimeUtils";
import {
  get_all_full_queues_for_tournament,
  get_full_active_queue_for_tournament,
} from "../../services/queue";
import { useState } from "react";
import { FullQueueData, FullRideData } from "../../../types";

const TournamentTable = () => {
  const { id } = useParams();
  const [currentPlayer, SetCurrentPlayer] = useState<FullQueueData | null>(
    null
  );
  const [queueData, setQueueData] = useState<FullQueueData[] | null>(null);
  const [lastRide, SetLastRide] = useState<FullRideData | null>(null);
  const { data } = useQuery(
    "getTableForTurnament",
    async () => await get_tournament_best_full_rides(Number(id)),
    { refetchInterval: 3000 }
  );

  useQuery(
    "getLastRide",
    async () => await get_full_active_queue_for_tournament(Number(id)),
    {
      onSuccess: (res) => SetCurrentPlayer(res),
      onError: () => SetCurrentPlayer(null),
      refetchInterval: 3000,
    }
  );

  useQuery(
    "getQueues",
    async () => await get_all_full_queues_for_tournament(Number(id)),
    {
      onSuccess: (res) => {
        setQueueData(res);
      },
      onError: () => {
        setQueueData(null);
      },
      refetchInterval: 3000,
    }
  );

  useQuery(
    "lastRide",
    async () => await get_tournament_last_full_ride(Number(id)),
    {
      onSuccess: (res) => SetLastRide(res),
      onError: () => SetLastRide(null),
    }
  );

  const navigate = useNavigate();

  return !data ? (
    <p>Loading...</p>
  ) : (
    <div className="d-flex">
      <div className="p-3 col-8">
        <table className="table table-striped text-center align-middle">
          <thead className="table-dark">
            <tr>
              <th>Lp.</th>
              <th>Imie</th>
              <th>Nazwisko</th>
              <th>Szkoła</th>
              <th>Gokart</th>
              <th>Czas</th>
              <th>Różnica</th>
              <th>Edytuj</th>
            </tr>
          </thead>
          <tbody>
            {data
              ?.sort((a, b) => {
                if (a.isDisqualified && !b.isDisqualified) return 1;
                if (!a.isDisqualified && b.isDisqualified) return -1;
                return 0;
              })
              .map((element, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{element.player.name}</td>
                  <td>{element.player.surname}</td>
                  <td>{element.player.school.acronym}</td>
                  <td>{element.gokart.name}</td>
                  <td style={element.isDisqualified ? { color: "red" } : {}}>
                    {element.isDisqualified
                      ? "DSQ"
                      : convertTimeToString(element.time)}
                  </td>
                  <td
                    style={{
                      color:
                        index != 0 || element.isDisqualified ? "red" : "blue",
                    }}
                  >
                    {element.isDisqualified
                      ? "DSQ"
                      : index == 0
                      ? convertTimeToString(element.time)
                      : "+" +
                        convertTimeToString(
                          element.time - data[index - 1].time
                        )}
                  </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        navigate(`/przejazd/${element.rideId}/edytuj`)
                      }
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <div className="col-4 p-3 d-flex flex-column gap-5">
        {currentPlayer && (
          <div className="currentRideContainer">
            <header className="bg-dark bg-dark p-3 fs-2 text-white text-center">
              Aktualny przejazd
            </header>
            <div className="currentRideDetails d-flex flex-column gap-3">
              <div>
                <label className="p-1">Imie i nazwisko</label>
                <input
                  className="form-control"
                  disabled
                  value={
                    currentPlayer?.player.name +
                    " " +
                    currentPlayer?.player.surname
                  }
                />
              </div>
              <div>
                <label className="p-1">Gokart</label>
                <input
                  className="form-control"
                  disabled
                  value={currentPlayer?.gokart.name}
                />
              </div>
              <div>
                <label className="p-1">Szkoła</label>
                <input
                  className=" form-control"
                  disabled
                  value={currentPlayer.player.school.acronym}
                />
              </div>
            </div>
          </div>
        )}
        <div>
          <header className="bg-dark p-3 fs-2 text-white text-center">
            Kolejka
          </header>
          <div
            style={{
              borderBottomLeftRadius: "10px",
              borderBottomRightRadius: "10px",
              border: "1px solid gray",
            }}
            className="queueList"
          >
            {queueData?.slice(0, 3).map((element) => (
              <div style={{ borderBottom: "1px dashed gray" }} className="p-2">
                <div className="fs-4">
                  {element.player.name + " " + element.player.surname}
                </div>
                <div className="fs-6">{element.gokart.name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {lastRide && (
        <div className="lastRide">
          <h3>Ostatni przejazd</h3>
          <div>
            <label>
              {lastRide?.player.name + " " + lastRide?.player.surname}
            </label>
            <label htmlFor="">{lastRide?.gokart.name}</label>
            <label htmlFor="">
              {convertTimeToString(Number(lastRide?.time))}
            </label>
            <label
              style={{
                color: data[0].time - lastRide?.time < 0 ? "blue" : "red",
              }}
            >
              {(data[0].time - lastRide?.time < 0 ? "-" : "+") +
                convertTimeToString(data[0].time - lastRide?.time)}
            </label>
          </div>
        </div>
      )}
    </div>
  );
};
export default TournamentTable;
