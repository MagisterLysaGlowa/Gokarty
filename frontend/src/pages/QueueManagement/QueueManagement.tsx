import {
  Button,
  Divider,
  Input,
  NumberInput,
  Select,
  SelectItem,
} from "@heroui/react";
import { Header } from "../../components/StaticPageComponents/Header";
import { Separator } from "../../components/StaticPageComponents/Separator";
import { Footer } from "../../components/componentsExport";
import { GokartQueries } from "../../queries/gokartQuery";
import { TableComponent } from "../../components/Table/TableComponent";
import { QueueQueries } from "../../queries/queueQuery";
import { useNavigate, useParams } from "react-router-dom";
import { useCustomTableCells } from "../../components/CustomTableCells/CustomTableCells";
import { useGetCols, useGetRows } from "./queueManagementUtils";
import { useState } from "react";
import { QueueData } from "../../../types";
import { RideQueries } from "../../queries/rideQuery";
import { calculateTimeFromStringToMs } from "../../Utils/TimeUtils";

export const QueueManagement = () => {
  const { id: tournamentId } = useParams();
  const navigate = useNavigate();
  const { data: gokarts } = GokartQueries.getAllGokarts();
  const [drivingNow, setDrivingNow] = useState<QueueData | undefined>(undefined);
  const [queues, setQueues] = useState<QueueData[]>([]);
  QueueQueries.getAllFullQueuesForTournament(Number(tournamentId), {
    onSuccess: (res) => {
      if(localStorage.getItem("isAnyoneDrivingNow" + tournamentId)) {
        setDrivingNow(res[0]);
        setQueues(res.splice(1, res.length - 1));
      } else {
        setQueues(res);
      }
    }
  });
  const [time, setTime] = useState<string>("00:00:000");
  const [penaltyPoints, setPenaltyPoints] = useState<number>(0);

  const tableCells = useCustomTableCells();
  const rows = useGetRows(queues);
  const cols = useGetCols();

  const { mutateAsync: createRideAsync } = RideQueries.createRide();
  const { mutateAsync: removeQueueAsync } = QueueQueries.removeQueue();

  function StartRide() {
    localStorage.setItem("isAnyoneDrivingNow" + tournamentId, "true");
    setDrivingNow(queues[0]);
    setQueues(queues.splice(1, queues.length - 1));
  }

  function RestartRide() {
    setTime("00:00:000");
    setPenaltyPoints(0);
  }

  async function SubmitRide(isDisqualified: number) {
    if(drivingNow) {
      await createRideAsync({
        gokartId: drivingNow.gokart.gokartId,
        isDisqualified: isDisqualified,
        playerId: drivingNow.player.playerId,
        time: calculateTimeFromStringToMs(time),
        tournamentId: Number(tournamentId),
        penaltyPoints: penaltyPoints,
      });
      await removeQueueAsync(Number(drivingNow.queueId));
      RestartRide();
      setDrivingNow(undefined);
      localStorage.setItem("isAnyoneDrivingNow" + tournamentId, "");
    }
  }

  return (
    <div className="h-full w-full max-h-full flex flex-col overflow-hidden">
      <Header>
        <p className="text-main-default text-center text-4xl">Kolej `ka`</p>
      </Header>
      <Separator />
      <div className="grid grid-cols-[70%_30%] h-full overflow-hidden gap-3 p-3">
        <TableComponent rows={rows} columns={cols} tableCells={tableCells} />
        <div className="w-full h-full flex items-center justify-center relative">
          <div className="w-[90%] h-[90%] border-2 border-main-default grid grid-rows-[30%_5%_35%_5%_25%] rounded-xl p-3">
            <div className="flex flex-col gap-3">
              <p className="text-main-default text-center text-3xl">
                Aktualny przejazd
              </p>
              <span className="flex flex-col text-center">
                <span className="text-gray-400">Osoba</span>
                {drivingNow && <span>{drivingNow.player.name} {drivingNow.player.surname} {drivingNow.player.class?.name}</span>}
              </span>
              <div className="flex flex-col items-center justify-center w-[90%] mx-auto gap-2">
                <p>Gokart:</p>
                <Select
                  items={gokarts || []}
                  selectedKeys={drivingNow ? [String(drivingNow?.gokart.gokartId)] : []}
                  aria-label="Gokart"
                  onChange={(e) => { 
                    if(drivingNow)
                      setDrivingNow({...drivingNow, gokart: {...drivingNow.gokart, gokartId: Number(e.target.value)}})
                  }}
                >
                  {(item) => (
                    <SelectItem key={item.gokartId}>{item.name}</SelectItem>
                  )}
                </Select>
              </div>
            </div>
            <div className="flex items-center w-[90%] mx-auto">
              <Divider className="h-[5px] rounded-lg" />
            </div>
            <div className="flex flex-col gap-3 flex-1">
              <p className="text-center">Czas przejazdu</p>
              <Input
                aria-label="Czas przejazdu"
                value={time}
                onValueChange={setTime}
                className="w-[90%] mx-auto text-center"
              />
              <div className="flex flex-col gap-2 justify-center items-center">
                <span>Punkty karne:</span>
                <NumberInput
                  aria-label="Punkty karne"
                  value={penaltyPoints}
                  onValueChange={setPenaltyPoints}
                  color="danger"
                  size="sm"
                  className="w-[90%]"
                />
              </div>
            </div>
            <div className="flex items-center w-[90%] mx-auto">
              <Divider className="h-[5px] rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 justify-center px-5 w-[90%] mx-auto">
              <Button onPress={async () => await SubmitRide(0)}  className="bg-green-800">Zatwierdź</Button>
              <Button onPress={RestartRide}>Rozpocznij ponownie</Button>
              <Button onPress={async () => await SubmitRide(1)} className="bg-red-800">Dyskwalifikuj przejazd</Button>
            </div>
          </div>
          {!drivingNow &&
          <div className="absolute w-full h-full inset-0 bg-gradient-to-l from-white/5 to-[#141414] backdrop-blur-sm shadow-xl flex items-center justify-center">
            <div className="w-[80%] mx-auto my-auto border-2 border-main-default bg-[#141414] rounded-xl p-3 flex items-center flex-col gap-3">
              {queues.length > 0 ?
              <>
                <p className="text-3xl">Następny:</p>
                <span className="text-xl">{queues[0].player.name} {queues[0].player.surname} {queues[0].player.class?.name}</span>
                <Button onPress={StartRide}  className="bg-green-500 text-xl p-6">Rozpocznij przejazd</Button>
              </> :
              <>
                <p className="text-3xl">Kolejka zakończona</p>
                <Button onPress={() => navigate(-1)} className="bg-green-500 text-xl p-6">Wróć do losowania kolejki</Button>
              </>
              }
            </div>
          </div>}
        </div>
      </div>
      <Separator />
      <Footer />
    </div>
  );
};
