import { Link, useParams } from "react-router-dom";
import { PlayerQueries } from "../../../../queries/playerQuery";
import { useState } from "react";
import { Input, useDisclosure } from "@heroui/react";
import {
  defaultRemoveButtonProps,
  defaultVariant,
} from "../../../../Utils/globalUtils";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { useDebounce } from "../../../../Utils/debounce";
import {
  useGetColumns,
  useGetMemorizedData,
} from "./playersForTournamentUtils";
import { useCustomTableCells } from "../../../../components/CustomTableCells/CustomTableCells";
import { TableComponent } from "../../../../components/Table/TableComponent";
import { YesNoModal } from "../../../../components/YesNoModal/YesNoModal";
import { inputConfig } from "../../../../configs/inputConfig";
import { LoadingWrapper } from "../../../../components/Loading/LoadingWrapper";
import { TableActionProps } from "../../../../../types";

export const PlayersForTournament = () => {
  const { id: tournamentId, tournamentName } = useParams();
  const { data, isLoading } = PlayerQueries.getPlayersForTournament(
    Number(tournamentId)
  );
  const {
    mutateAsync: removePlayerFromTournament,
    isLoading: isRemoveLoading,
  } = PlayerQueries.removePlayerFromTournament();
  const {
    mutateAsync: removePlayersFromTournament,
    isLoading: isMassRemoveLoading,
  } = PlayerQueries.removePlayersFromTournament();

  const [filter, setFilter] = useState("");
  const filterSearch = useDebounce(filter);

  const [selectedPlayerId, setSelectedPlayerId] = useState<number | undefined>(
    undefined
  );
  const selectedPlayer = data?.find(
    (player) => player.playerId == selectedPlayerId
  );
  const [selectedPlayerIds, setSelectedPlayerIds] = useState<number[]>([]);

  const removeModal = useDisclosure();
  const massRemoveModal = useDisclosure();

  const columns = useGetColumns();
  const memorizedData = useGetMemorizedData(data, filterSearch);
  const customCell = useCustomTableCells(setSelectedPlayerId, [
    { modal: removeModal, buttonProps: defaultRemoveButtonProps },
  ]);

  const massActions: TableActionProps[] = [
    { modal: massRemoveModal, buttonProps: defaultRemoveButtonProps },
  ];

  return (
    <div className="flex flex-col h-full max-h-full overflow-hidden gap-3">
      <div className="w-1/3">
        <Input
          placeholder={"Wyszukiwarka"}
          startContent={<FaMagnifyingGlass />}
          variant={defaultVariant}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
          {...inputConfig}
        />
      </div>

      <LoadingWrapper data={memorizedData} isLoading={isLoading}>
        {(rows) => (
          <TableComponent
            emptyContent={
              <span>
                Brak zawodników! Dodaj ich{" "}
                <Link
                  className="text-main-default underline"
                  to={`/zawody/${tournamentId}/${tournamentName}/dodaj zawodnikow`}
                >
                  tutaj.
                </Link>
              </span>
            }
            columns={columns}
            rows={rows}
            tableCells={customCell}
            massActions={massActions}
            selectedItems={selectedPlayerIds}
            setSelectedItems={setSelectedPlayerIds}
          />
        )}
      </LoadingWrapper>

      {selectedPlayer && (
        <YesNoModal
          isFunctionLoading={isRemoveLoading}
          header="Usuwanie gracza z turnieju"
          modal={removeModal}
          onYes={async () =>
            removePlayerFromTournament({
              tournamentId: Number(tournamentId),
              playerId: Number(selectedPlayerId),
            })
          }
          key={`remove-${selectedPlayerId}`}
        >
          <div className="flex flex-col gap-2">
            <div>{selectedPlayer.name + " " + selectedPlayer.surname}</div>
            <div>{selectedPlayer.birthDate.toLocaleDateString()}</div>
            <div>{selectedPlayer.class?.school?.acronym ?? ""}</div>
          </div>
        </YesNoModal>
      )}
      {selectedPlayerIds.length > 0 && (
        <YesNoModal
          isFunctionLoading={isMassRemoveLoading}
          header="Usuwanie graczy z turnieju"
          modal={massRemoveModal}
          onYes={async () =>
            await removePlayersFromTournament({
              tournamentId: Number(tournamentId),
              playerIds: selectedPlayerIds,
            })
          }
          key={`remove-${selectedPlayerIds.length}`}
        >
          {`Czy na pewno chcesz usunąć ${selectedPlayerIds.length} graczy z zawodów?`}
        </YesNoModal>
      )}
    </div>
  );
};
