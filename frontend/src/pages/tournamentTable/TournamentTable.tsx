import "./tournamentTable.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { FullQueueData, FullRideData } from "../../../types";
import { RideQueries } from "../../queries/rideQuery";
import { QueueQueries } from "../../queries/queueQuery";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/react";
import { columns, getRows, getTableTextColor } from "./tournamentTableUtils";
import { FaArrowLeftLong, FaArrowRightLong } from "react-icons/fa6";

const TournamentTable = () => {
  const { id } = useParams();
  const [currentPlayer, SetCurrentPlayer] = useState<FullQueueData | null>(
    null
  );
  const [queueData, setQueueData] = useState<FullQueueData[] | null>(null);
  const [lastRide, SetLastRide] = useState<FullRideData | null>(null);
  const { data } = RideQueries.getTournamentBestFullRides(Number(id), {
    refetchInterval: 3000,
  });

  QueueQueries.getFullActiveQueueForTournament(Number(id), {
    onSuccess: (res) => SetCurrentPlayer(res),
    onError: () => SetCurrentPlayer(null),
    refetchInterval: 3000,
  });

  QueueQueries.getAllFullQueuesForTournament(Number(id), {
    onSuccess: (res) => setQueueData(res),
    onError: () => setQueueData(null),
    refetchInterval: 3000,
  });

  RideQueries.getTournamentLastFullRide(Number(id), {
    onSuccess: (res) => SetLastRide(res),
    onError: () => SetLastRide(null),
    refetchInterval: 3000,
  });

  // const navigate = useNavigate();

  const rows = getRows(data);

  return (
    <div className="flex flex-col overflow-auto min-h-full">
      <div className="text-center text-5xl p-3 max-h-dvh font-jura flex gap-3 justify-center">
        <span>Tabela</span>
        <span className="text-main-default">Wyników</span>
      </div>
      <div className="py-4 bg-white w-full border-y-8 border-main-default" />
      <div className="flex-1 flex p-3">
        <Table
          aria-label="Example table with dynamic content"
          className="bg-transparent table w-8/12"
          hideHeader
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows ?? []}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell
                    className={`${getTableTextColor(item.key)} text-lg`}
                  >
                    {getKeyValue(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <div className="flex flex-col flex-1 gap-3 w-4/12">
          <div className="h-4/6 grid grid-rows-3 tableInfoBox border-2 border-main-default">
            <div className="tableInfoBoxRowBorder flex flex-col">
              <span className="text-center text-main-default text-3xl">
                Ostatni przejazd:
              </span>
              <div className="flex-1 flex-col flex justify-evenly">
                <div className="w-full grid grid-cols-5 text-center text-gray-400">
                  <div>Osoba</div>
                  <div>Gokart</div>
                  <div>Punkty Karne</div>
                  <div>Czas</div>
                  <div>Rożnica</div>
                </div>
                <div className="w-full grid grid-cols-5 text-center items-center text-md">
                  <div className="flex flex-col">
                    <span>Adam Kowalski</span>
                    <span className="text-small">ZsijTo</span>
                  </div>
                  <div>Czerwony XDDDDD</div>
                  <div className="text-red-400 text-2xl">2</div>
                  <div>00:00:000</div>
                  <div className="text-red-400">+00:00:000</div>
                </div>
              </div>
            </div>
            <div className="tableInfoBoxRowBorder flex flex-col justify-center">
              <span className="text-center text-main-default text-3xl">
                Jedzie:
              </span>
              <div className="flex items-center justify-between flex-1">
                <FaArrowRightLong className="text-4xl text-main-default" />
                <div className="flex w-full justify-evenly text-2xl">
                  <div>Imie Nazwisko</div>
                  <div>Scenic 1.9TDI</div>
                </div>
                <FaArrowLeftLong className="text-4xl text-main-default" />
              </div>
            </div>
            <div className="w-full flex flex-col justify-center items-center gap-3">
              <span className="text-center w-full text-main-default text-3xl">
                Nastepni:
              </span>
              <ol className="text-xl">
                {Array.from({ length: 3 }).map((_, index) => (
                  <li>{index + 1}. Adam Jakis</li>
                ))}
              </ol>
            </div>
          </div>
          <div className="h-2/6 w-full bg-[#3F3E3E] rounded-xl"></div>
        </div>
      </div>
      <div className="py-4 bg-white w-full border-y-8 border-main-default" />
      <div className="p-3 w-full">
        <p className="text-white font-bold text-center">
          Mechanik OG full gangsta © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
export default TournamentTable;
