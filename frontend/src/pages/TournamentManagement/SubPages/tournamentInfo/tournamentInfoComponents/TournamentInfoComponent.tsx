import { TournamentData } from "../../../../../../types";
import { Loading } from "../../../../../components/Loading/Loading";

type InfoProps = {
  tournament: TournamentData;
  isLoading: boolean;
};

export const TournamentInfoComponent: React.FC<InfoProps> = ({
  isLoading,
  tournament,
}) => {
  if (isLoading) return <Loading isLoading />;
  return (
    <div className="gap-5 text-center flex-1">
      <div className="flex flex-col gap-2">
        <h2 className="text-main-default text-center text-4xl">Nazwa</h2>
        <span className="text-xl">{tournament?.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-main-default text-center text-4xl">Data trwania</h2>
        <span className="text-xl">
          {tournament?.startDate.toLocaleDateString() +
            " - " +
            tournament?.endDate.toLocaleDateString()}
        </span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-main-default text-center text-4xl">
          Rodzaj kolejki
        </h2>
        <span>{tournament?.tournamentType?.name}</span>
      </div>
    </div>
  );
};
