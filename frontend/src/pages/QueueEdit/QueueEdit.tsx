import { useMutation, useQuery } from "react-query";
import {
  addPlayerToQueue,
  get_all_full_queues_for_tournament,
  playersForQueue,
} from "../../services/queue";
import { useParams } from "react-router-dom";

export const QueueEdit = () => {
  const { id } = useParams();

  const { data: queue, refetch: refetchQueue } = useQuery(
    "queue",
    async () => await get_all_full_queues_for_tournament(Number(id)),
    {
      onSuccess: (res) => console.log(res),
    }
  );

  const { data, refetch: refetchPlayers } = useQuery(
    "players",
    async () => await playersForQueue(Number(id)),
    {
      onSuccess: (res) => console.log(res),
    }
  );

  const { mutateAsync: addPlayer } = useMutation(
    async (playerId: number) => await addPlayerToQueue(Number(id), playerId),
    {
      onSuccess: async () => {
        await refetchPlayers();
        await refetchQueue();
      },
    }
  );

  return (
    <div className="d-flex p-3 gap-3">
      <div className="col-6 ">
        <h3 className="text-center">Obecna kolejka</h3>
        {queue && queue.length > 0 && (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Lp</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Szkoła</th>
              </tr>
            </thead>
            <tbody>
              {queue?.map((player, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{player.player.name}</td>
                  <td>{player.player.surname}</td>
                  <td>{player.player.school.acronym}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <div className="col-4">
        <h3 className="text-center">Możliwość dodania</h3>
        {data && data.length > 0 && (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Lp</th>
                <th>Imie</th>
                <th>Nazwisko</th>
                <th>Dodaj</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((player, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{player.name}</td>
                  <td>{player.surname}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        addPlayer(player.playerId);
                      }}
                    >
                      Dodaj
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};
