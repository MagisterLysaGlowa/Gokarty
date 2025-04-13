import { useEffect, useState } from "react";
import { PlayerQueries } from "../../../../queries/playerQuery";
import { PlayerFilterFormData, TableActionProps } from "../../../../../types";
import { useParams } from "react-router-dom";
import { SchoolQueries } from "../../../../queries/schoolQuery";
import { Input, Select, SelectItem, useDisclosure } from "@heroui/react";
import {defaultAddButtonProps, defaultVariant } from "../../../../Utils/globalUtils";
import { useColumns, useMemorizedPlayers } from "./AddPlayerForTournamentUtils";
import { useCustomTableCells } from "../../../../components/CustomTableCells/CustomTableCells";
import { useDebounce } from "../../../../Utils/debounce";
import { TableComponent } from "../../../../components/Table/TableComponent";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { inputConfig } from "../../../../configs/inputConfig";
import { selectConfig } from "../../../../configs/selectConfig";
import { LoadingWrapper } from "../../../../components/Loading/LoadingWrapper";
import { ClassQueries } from "../../../../queries/classQuery";

export const AddPlayerForTournament = () => {
  const { id: tournamentId } = useParams();
  const [playerFilter, setPlayerFilter] = useState<PlayerFilterFormData>({
    name: "",
    schoolId: 0,
    surname: "",
    classId: 0,
    tournamentId: Number(tournamentId),
  });
  const serverFilter = useDebounce(playerFilter);

  const { mutateAsync: addPlayer } = PlayerQueries.addPlayerToTournament();
  const { mutateAsync: addPlayers } = PlayerQueries.addPlayersToTournament();
  const { data: schools } = SchoolQueries.getAllSchools();
  const {
    data: players,
    refetch,
    isFetching,
  } = PlayerQueries.filterPlayers(serverFilter);
  const { data: classes } = ClassQueries.getAllClasses();

  useEffect(() => {
    refetch();
  }, [serverFilter, refetch]);

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(
    undefined
  );
  const selectedPlayer = players?.find(
    (player) => player.playerId == selectedPlayerId
  );
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);

  const addModal = useDisclosure();
  const massAddModal = useDisclosure();

  const columns = useColumns();
  const memorizedData = useMemorizedPlayers(players);
  const customCell = useCustomTableCells(setSelectedPlayerId, [
    { modal: addModal, buttonProps: defaultAddButtonProps },
  ]);

  const massActions: TableActionProps[] = [
    { modal: massAddModal, buttonProps: defaultAddButtonProps }
  ];

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="grid grid-cols-4 gap-2">
        <Input
          placeholder="Imie"
          variant={defaultVariant}
          value={playerFilter.name}
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, name: e.target.value }))
          }
          {...inputConfig}
        />
        <Input
          placeholder="Nazwisko"
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
        <Select
          {...selectConfig}
          items={
            classes?.filter((z) => z.schoolId == playerFilter.schoolId) || []
          }
          aria-label="Wybierz klasę"
          placeholder="Wybierz klasę"
          onChange={(e) =>
            setPlayerFilter((p) => ({ ...p, classId: Number(e.target.value) }))
          }
        >
          {(c) => <SelectItem key={c.classId}>{c.name}</SelectItem>}
        </Select>
      </div>

      <LoadingWrapper data={memorizedData} isLoading={isFetching}>
        {(data) => (
          <TableComponent
            columns={columns}
            rows={data}
            tableCells={customCell}
            massActions={massActions}
            selectedItems={selectedPlayerIds}
            setSelectedItems={setSelectedPlayerIds}
          />
        )}
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
      {selectedPlayerIds.length > 0 && (
        <YesNoModal
          buttonText="Dodaj"
          header="Dodaj zawodników"
          onYes={async () =>
            await addPlayers({
              tournamentId: Number(tournamentId),
              playerIds: selectedPlayerIds,
            })
          }
          modal={massAddModal}
          key={`add-${selectedPlayerIds.length}`}
        >
          {`Czy napewno chcesz dodać ${selectedPlayerIds.length} zawodników`}
        </YesNoModal>
      )}
    </div>
  );
};
