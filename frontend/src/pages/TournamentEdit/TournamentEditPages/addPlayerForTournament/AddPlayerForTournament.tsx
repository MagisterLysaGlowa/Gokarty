import { useEffect, useState } from "react";
import { PlayerQueries } from "../../../../queries/playerQuery";
import {
  PlayerFilterFormData,
} from "../../../../../types";
import { useParams } from "react-router-dom";
import { SchoolQueries } from "../../../../queries/schoolQuery";
import {
  Input,
  Select,
  SelectItem,
  useDisclosure,
} from "@heroui/react";

import { AddPlayerToTournamentModal } from "./AddPlayerToTournamentModal";
import { defaultAddButtonProps, defaultVariant } from "../../../../Utils/globalUtils";
import { useColumns, useMemorizedPlayers } from "./AddPlayerForTournamentUtils";
import { useCustomTableCells } from "../../../../components/CustomTableCells/CustomTableCells";
import { useDebounce } from "../../../../Utils/debounce";
import { Loading } from "../../../../components/Loading/Loading";
import { TableComponent } from "../../../../components/Table/TableComponent";

export const AddPlayerForTournament = () => {
  const { id } = useParams();
  const [playerFilter, setPlayerFilter] = useState<PlayerFilterFormData>({
    name: "",
    schoolId: -1,
    surname: "",
    tournamentId: Number(id),
  });
  const serverFilter = useDebounce(playerFilter);

  const { data: schools } = SchoolQueries.getAllSchools();
  const { data: players, refetch, isFetching } = PlayerQueries.filterPlayers(serverFilter);

  useEffect(() => {
    refetch();
  }, [serverFilter, refetch]);
  
  const columns = useColumns();
  const rows = useMemorizedPlayers(players);
  
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined);
  const selectedPlayer = players?.find(player => player.playerId == selectedPlayerId);

  const addModal = useDisclosure();
  
  const customCell = useCustomTableCells(
    setSelectedPlayerId,
    [{ modal: addModal, buttonProps: defaultAddButtonProps}]
  )

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="flex gap-2">
        <Input
          placeholder="Imie"
          className="w-max"
          variant={defaultVariant}
          value={playerFilter.name}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, name: e.target.value }))
          }
        />
        <Input
          placeholder="Nazwisko"
          className="w-max"
          variant={defaultVariant}
          value={playerFilter.surname}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, surname: e.target.value }))
          }
        />
        <Select
          items={schools || []}
          aria-label="Wybierz szkołę"
          value={playerFilter.schoolId}
          variant={defaultVariant}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, schoolId: Number(e.target.value) }))
          }
          placeholder="Wybierz szkołę"
        >
          {(s) => <SelectItem key={s.schoolId}>{s.acronym}</SelectItem>}
        </Select>
      </div>
        
      {isFetching ?
        <Loading isLoading={isFetching}/> :
        <TableComponent columns={columns} rows={rows} tableCells={customCell}/>
      }
      {selectedPlayer &&
        <AddPlayerToTournamentModal
          modal={addModal}
          player={selectedPlayer}
        />
      }
    </div>
  );
};
