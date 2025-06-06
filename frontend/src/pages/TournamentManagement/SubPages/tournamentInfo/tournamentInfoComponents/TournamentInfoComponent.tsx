import { TournamentData } from "../../../../../../types";
import { displayDateRange } from "../../../../../Utils/TimeUtils";

type InfoProps = {
  tournament: TournamentData;
  isLoading: boolean;
};

export const TournamentInfoComponent: React.FC<InfoProps> = ({
  tournament,
}) => {

  return (
    <div className="gap-5 text-center flex-1 flex flex-col justify-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-main-default text-center text-4xl">Nazwa</h2>
        <span className="text-xl">{tournament.name}</span>
      </div>
      <div className="flex flex-col gap-2">
        <h2 className="text-main-default text-center text-4xl">Data trwania</h2>
        <span className="text-xl">
          {displayDateRange(tournament.startDate, tournament.endDate)}
        </span>
      </div>
    </div>
  );
};
