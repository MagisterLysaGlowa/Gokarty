import "./TournamentManegement.css";
import { RideRandomization } from "../../components/componentsExport";
import { useQuery } from "react-query";
import { get_all_full_queues_for_tournament } from "../../services/queue";
import { useParams } from "react-router-dom";
export const TournamentManegement = () => {
  const { id } = useParams();
  const {
    data: queueData,
    isLoading: isQueueLoading,
    isFetching: isQueueFetching,
    refetch,
  } = useQuery(
    "getQueues",
    async () => await get_all_full_queues_for_tournament(Number(id)),
    {
      onSuccess: (res) => {
        console.log(res);
      },
    }
  );

  if (isQueueLoading || isQueueFetching) return <p>Loading...</p>;
  else if (queueData?.length == 0)
    return <RideRandomization refetch={refetch} />;
  return (
    <div className="manegmentContainer p-3 d-flex justify-content-evenly">
      <div className="d-flex flex-column rideList" style={{ gap: "10px" }}>
        <header>
          <div>Lp.</div>
          <div>Imie</div>
          <div>Nazwisko</div>
          <div>Szkoła</div>
          <div>Gokart</div>
        </header>
        {queueData?.map((player, index) => (
          <div className="d-flex rideListElement">
            <div>{index + 1}</div>
            <div>{player.player.name}</div>
            <div>{player.player.surname}</div>
            <div>Szkoła</div>
            <div>Gokart</div>
          </div>
        ))}
      </div>
      <div className="fullContainer">
        <header className="currentTime">Aktualny przejazd</header>
        <div className="currentRideContainer">
          <div className="currentRide d-flex flex-column">
            <label>Imie Nazwisko</label>
            <label>Szkoła</label>
            <label>Gokart</label>
          </div>
          <div className="editTime d-flex flex-column align-items-center timeEdit">
            <h5>Czas przejazdu</h5>
            <div className="d-flex align-items-center">
              <input type="text" className="form-control" placeholder="min" />
              :
              <input type="text" className="form-control" placeholder="sek" />
              :
              <input type="text" className="form-control" placeholder="ms" />
            </div>
          </div>
          <div>
            <h5>Punkty karne</h5>
            <input type="number" className="form-control" />
          </div>
          <div>
            <button className="btn btn-primary">Zatwierdź</button>
          </div>
        </div>
      </div>
    </div>
  );
};
