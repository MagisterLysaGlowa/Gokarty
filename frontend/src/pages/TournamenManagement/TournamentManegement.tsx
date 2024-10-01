import "./TournamentManegement.css";
import { RideRandomization } from "../../components/componentsExport";
import { useMutation, useQuery } from "react-query";
import { get_all_full_queues_for_tournament, get_full_active_queue_for_tournament, remove_queues_for_tournament, update_queue_ride_status } from "../../services/queue";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { convertRawToPhotoCellData, convertTimeFromMilisecondsToObject, getTimeInMs } from "../../Utils/TimeUtils";
import { create_ride } from "../../services/ride";
import { FullQueueData, RideFormData } from "../../../types";
import apiClient from "../../services/apiClient";

export const TournamentManegement = () => {
  const { id } = useParams();
  const [penaltyPoints, setPenaltyPoints] = useState<number>(0);
  const [queueData, setQueueData] = useState<FullQueueData[] | null>(null);
  const [activeQueueData, setActiveQueueData] = useState<FullQueueData | null>(null);
  const {
    isLoading: isQueueLoading,
    isFetching: isQueueFetching,
    refetch: queuesRefetch,
  } = useQuery(
    "getQueues",
    async () => await get_all_full_queues_for_tournament(Number(id)), {
      onSuccess: (res) => {
        setQueueData(res);
      },
      onError: () => {
        setQueueData(null);
      }
    }
  );

  const {
    isLoading: isActiveQueueLoading,
    isFetching: isAcitveQueueFetching,
    refetch: activeQueueRefetch,
  } = useQuery(
    "getActiveQueues",
    async () => await get_full_active_queue_for_tournament(Number(id)), {
      onSuccess: (res) => {
        setActiveQueueData(res);
      },
      onError: () => {
        setActiveQueueData(null);
      }
    }
  );

  const [time, setTime] = useState<number>(0);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const [photocellStartSeeker, setPhotocellStartSeeker] = useState<boolean>(false);
  const [photocellEndSeeker, setPhotocellEndSeeker] = useState<boolean>(false);
  const [rideFinished, setRideFinished] = useState<boolean>(false);
  
  useEffect(() => {
    let interval: any;
    if (timerActive) {
      interval = setInterval(() => {
        setTime((prev) => prev + 10);
      }, 10);
    }
    return () => clearInterval(interval);
  }, [timerActive]);

  useQuery(
    "getPhotoCellData",
    async () => (await apiClient.get("photoCell")).data, {
      onSuccess: (res: string) => {
        const html = new DOMParser().parseFromString(String(res), "text/html");
        const pageFields = Array.from(html.querySelectorAll("p")).map(z=>z.textContent);
        const data = convertRawToPhotoCellData(pageFields);
        if(photocellStartSeeker && data.photocell1Activ) {
          setPhotocellStartSeeker(false);
          setPhotocellEndSeeker(true);
          setTimerActive(true);
        }
        if(photocellEndSeeker && data.photocell3Activ) {
          setPhotocellEndSeeker(false);
          setTimerActive(false);
          setTime(getTimeInMs(data.time));
          setRideFinished(true);
        }

      },
      retry: true,
      refetchInterval: (photocellStartSeeker || photocellEndSeeker) ? 100 : false,
      refetchOnWindowFocus: true,
      enabled: photocellStartSeeker || photocellEndSeeker,
    }
  )

  const { mutateAsync: queueStatusUpdate } = useMutation(async (queueId: number) => await update_queue_ride_status(queueId), {
    onSuccess: async () => {
      await activeQueueRefetch();
      await queuesRefetch();
      
    }
  });

  const { mutateAsync: timeSave } = useMutation(async (data: RideFormData) => await create_ride(data), {
    onSuccess: async () => {
      setRideFinished(false);
      await queueStatusUpdate(Number(activeQueueData?.queueId));
      setTime(0);
      setPenaltyPoints(0);
      if(queueData?.length == 0)
        await deleteQueue();
    }
  })

  const { mutateAsync: deleteQueue } = useMutation(async () => await remove_queues_for_tournament(Number(id)), {
    retry: false,
    onError: async () => {
      await deleteQueue();
    }
  })

  
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
        {activeQueueData ?
          (<div className="col-4">
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
                  <input type="text" className="form-control text-center" disabled={!rideFinished} placeholder="min" value={convertTimeFromMilisecondsToObject(time).m.toString().padStart(2, "0")}/>
                  :
                  <input type="text" className="form-control text-center" disabled={!rideFinished} placeholder="sek" value={convertTimeFromMilisecondsToObject(time).s.toString().padStart(2, "0")} />
                  :
                  <input type="text" className="form-control text-center" disabled={!rideFinished} placeholder="ms" value={convertTimeFromMilisecondsToObject(time).ms.toString().padStart(3, "0")}/>
                </div>
              </div>
              <div className="d-flex flex-column text-center gap-3">
                <div>
                  <h5>Punkty karne</h5>
                  <input type="number" className="form-control" disabled={!rideFinished} value={penaltyPoints} onChange={(e) => setPenaltyPoints(parseInt(e.target.value))}/>
                </div>
                <button
                  className="btn btn-primary"
                  disabled={!rideFinished}
                  onClick={ async () => {
                    await timeSave({tournamentId: Number(id), playerId: activeQueueData.playerId, gokartId: activeQueueData.gokartId, time: time + penaltyPoints * 1000, isDisqualified: penaltyPoints >= 4 ? 1 : 0})
                  }}>
                  Zatwierdź
                </button>
                <button
                  className="btn btn-secondary"
                  disabled={!rideFinished}
                  onClick={() => {
                    setPhotocellEndSeeker(false);
                    setPhotocellStartSeeker(false);
                    setTimerActive(false);
                    setTime(0);
                    setRideFinished(false);
                  }}>
                  Rozpocznij ponownie
                </button>
                <button
                  className="btn btn-danger"
                  disabled={!rideFinished}
                  onClick={ async () => {
                    await timeSave({tournamentId: Number(id), playerId: activeQueueData.playerId, gokartId: activeQueueData.gokartId, time: time, isDisqualified: 1})
                  }}>
                  Dyskwalifikuj przejazd
                </button>
              </div>
            </div>
          </div>) : (
          <div className="col-4 d-flex justify-content-center align-items-start">
            <button 
              type="button"
              disabled={photocellStartSeeker}
              className="btn btn-primary fs-5"
              onClick={async () => {
                  await queueStatusUpdate(Number(queueData?.[0].queueId));
                  setPhotocellStartSeeker(true);
                }}>
              Rozpocznij przejazd kolejnego zawodnika w kolejce
            </button>
          </div>
          )
        }
      </div>
    </div>
  );
};
