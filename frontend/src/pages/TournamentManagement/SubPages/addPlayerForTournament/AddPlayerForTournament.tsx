import { useEffect, useState } from "react";
import { PlayerQueries } from "../../../../queries/playerQuery";
import { PlayerFilterFormData } from "../../../../../types";
import { useParams } from "react-router-dom";
import { SchoolQueries } from "../../../../queries/schoolQuery";
import { Input, Select, SelectItem, useDisclosure } from "@heroui/react";

import {
  defaultAddButtonProps,
  defaultVariant,
} from "../../../../Utils/globalUtils";
import { useColumns, useMemorizedPlayers } from "./AddPlayerForTournamentUtils";
import { useCustomTableCells } from "../../../../components/CustomTableCells/CustomTableCells";
import { useDebounce } from "../../../../Utils/debounce";
import { TableComponent } from "../../../../components/Table/TableComponent";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { inputConfig } from "../../../../configs/inputConfig";
import { selectConfig } from "../../../../configs/selectConfig";
import { LoadingWrapper } from "../../../../components/Loading/LoadingWrapper";

export const AddPlayerForTournament = () => {
  const { id: tournamentId } = useParams();
  const [playerFilter, setPlayerFilter] = useState<PlayerFilterFormData>({
    name: "",
    schoolId: -1,
    surname: "",
    tournamentId: Number(tournamentId),
  });
  const serverFilter = useDebounce(playerFilter);

  const { mutateAsync: addPlayer } = PlayerQueries.addPlayerToTournament();
  const { data: schools } = SchoolQueries.getAllSchools();
  const { data: players, refetch, isFetching } = PlayerQueries.filterPlayers(serverFilter);

  useEffect(() => {
    refetch();
  }, [serverFilter, refetch]);

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(undefined);
  const selectedPlayer = players?.find((player) => player.playerId == selectedPlayerId);
  
  const addModal = useDisclosure();
  const columns = useColumns();
  const memorizedData = useMemorizedPlayers(players);
  const customCell = useCustomTableCells(setSelectedPlayerId, [
    { modal: addModal, buttonProps: defaultAddButtonProps },
  ]);


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
          {...inputConfig}
        />
        <Input
          placeholder="Nazwisko"
          className="w-max"
          variant={defaultVariant}
          value={playerFilter.surname}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, surname: e.target.value }))
          }
          {...inputConfig}
        />
        <Select
          {...selectConfig}
          items={schools || []}
          aria-label="Wybierz szkołę"
          value={playerFilter.schoolId}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, schoolId: Number(e.target.value) }))
          }
          placeholder="Wybierz szkołę"
        >
          {(s) => <SelectItem key={s.schoolId}>{s.acronym}</SelectItem>}
        </Select>
      </div>
      
      <LoadingWrapper data={memorizedData} isLoading={isFetching}>
        {(data) => <TableComponent columns={columns} rows={data} tableCells={customCell} />}
      </LoadingWrapper>

      {selectedPlayer && (
        <YesNoModal
          buttonText="Dodaj"
          header="Dodaj zawodnika"
          onYes={async () =>
            addPlayer({
              tournamentId: Number(tournamentId),
              playerId: Number(selectedPlayerId),
            })
          }
          modal={addModal}
          key={`add-${selectedPlayerId}`}
        >
          <h2>Czy napewno chcesz dodać zawodnika</h2>
          <span>
            {selectedPlayer.name} {selectedPlayer.surname}
          </span>
        </YesNoModal>
      )}
    </div>
  );
};
