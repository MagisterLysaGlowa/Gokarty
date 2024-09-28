import "./TournamentManegement.css";
import { RideRandomization } from "../../components/componentsExport";
import { useQuery } from "react-query";
import { get_all_full_queues_for_tournament, get_full_active_queue_for_tournament } from "../../services/queue";
import { useParams } from "react-router-dom";
import { useState } from "react";
export const TournamentManegement = () => {
  const { id } = useParams();
  const [peanltyPoints, setPenaltyPoints] = useState<number>(0);
  const {
    data: queueData,
    isLoading: isQueueLoading,
    isFetching: isQueueFetching,
    refetch: queuesRefetch,
  } = useQuery(
    "getQueues",
    async () => await get_all_full_queues_for_tournament(Number(id))
  );

  const {
    data: activeQueueData,
    isLoading: isActiveQueueLoading,
    isFetching: isAcitveQueueFetching,
  } = useQuery(
    "getActiveQueues",
    async () => await get_full_active_queue_for_tournament(Number(id))
  );

  if (isQueueLoading || isQueueFetching || isActiveQueueLoading || isAcitveQueueFetching)
    return <p>Loading...</p>;
  if (queueData?.length == 0 && activeQueueData == null)
    return <RideRandomization refetch={queuesRefetch} />;
  return (
    <div className="p-3">
      <div className="row">
        <div className="col-8">
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Lp.</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Szkoła</th>
                <th>Gokart</th>
              </tr>
            </thead>
            <tbody>
              {queueData?.map((queue, index) => (
                <tr key={queue.queueId}>
                  <td>{index + 1}</td>
                  <td>{queue.player.name}</td>
                  <td>{queue.player.surname}</td>
                  <td>{queue.player.school.acronym}</td>
                  <td>{queue.gokart.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {activeQueueData && 
          <div className="col-4">
            <h3 className="bg-dark text-white p-3">Aktualny przejazd</h3>
            <div className="currentRideContainer">
              <div className="currentRide d-flex flex-column">
                <label htmlFor="player" className="fs-6 m-1">Imię i nazwisko</label>
                <input id="player" type="text" disabled className="form-control fs-6" value={activeQueueData?.player.name + " " + activeQueueData?.player.surname}/>
                <label htmlFor="school" className="fs-6 m-1">Szkoła</label>
                <input id="school" type="text" disabled className="form-control fs-6" value={activeQueueData?.player.school.acronym}/>
                <label htmlFor="gokart" className="fs-6 m-1">Gokart</label>
                <input id="gokart" type="text" disabled className="form-control fs-6" value={activeQueueData?.gokart.name}/>
              </div>
              <div className="d-flex flex-column align-items-center py-2">
                <h5>Czas przejazdu</h5>
                <div className="d-flex align-items-center">
                  <input type="text" className="form-control" placeholder="min" />
                  :
                  <input type="text" className="form-control" placeholder="sek" />
                  :
                  <input type="text" className="form-control" placeholder="ms" />
                </div>
              </div>
              <div className="d-flex flex-column text-center gap-3">
                <div>
                  <h5>Punkty karne</h5>
                  <input type="number" className="form-control" value={peanltyPoints} onChange={(e) => setPenaltyPoints(parseInt(e.target.value))}/>
                </div>
                <button className="btn btn-primary">Zatwierdź</button>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  );
};
