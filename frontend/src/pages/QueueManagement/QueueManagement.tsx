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
import { useParams } from "react-router-dom";
import { useCustomTableCells } from "../../components/CustomTableCells/CustomTableCells";
import { useGetCols, useGetRows } from "./queueManagementUtils";

export const QueueManagement = () => {
  const { id: tournamentId } = useParams();
  const { data: gokart } = GokartQueries.getAllGokarts();
  const { data: players } = QueueQueries.getAllFullQueuesForTournament(
    Number(tournamentId)
  );

  const cosik = useCustomTableCells();
  const rows = useGetRows(players);
  const cols = useGetCols();

  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <Header>
        <p className="text-main-default text-center text-4xl">Kolej `ka`</p>
      </Header>
      <Separator />
      <div className="grid grid-cols-[70%_30%] flex-1 h-full">
        <div className="p-3">
          <TableComponent rows={rows} columns={cols} tableCells={cosik} />
        </div>
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-[90%] h-[90%] border-2 border-main-default grid grid-rows-[30%_5%_35%_5%_25%] rounded-xl p-3">
            <div className="flex flex-col gap-3">
              <p className="text-main-default text-center text-3xl">
                Aktualny przejazd
              </p>
              <span className="flex flex-col text-center">
                <span className="text-gray-400">Osoba</span>
                <span>Twoja Mama</span>
              </span>
              <div className="flex flex-col items-center justify-center w-[90%] mx-auto gap-2">
                <p>Gokart:</p>
                <Select items={gokart || []}>
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
                placeholder="00:00:000"
                className="w-[90%] mx-auto text-center"
              />
              <div className="flex flex-col gap-2 justify-center items-center">
                <span>Punkty karne:</span>
                <NumberInput
                  placeholder="pkt karne"
                  value={2}
                  color="danger"
                  className="w-[90%]"
                />
              </div>
            </div>
            <div className="flex items-center w-[90%] mx-auto">
              <Divider className="h-[5px] rounded-lg" />
            </div>
            <div className="flex flex-col gap-2 justify-center px-5 w-[90%] mx-auto">
              <Button className="bg-green-800">Zatwierdź</Button>
              <Button>Rozpocznij ponownie</Button>
              <Button className="bg-red-800">Dyskwalifikuj przejazd</Button>
            </div>
          </div>
        </div>
      </div>
      <Separator />
      <Footer />
    </div>
  );
};
