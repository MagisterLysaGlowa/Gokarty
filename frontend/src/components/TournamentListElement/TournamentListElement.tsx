import "./tournamentListElement.css";
import { useNavigate } from "react-router-dom";
import { TournamentData } from "../../../types";
import { Image } from "@heroui/react";
import { FaCalendar, FaEdit, FaTable } from "react-icons/fa";
interface TournamentListElementProps {
  data: TournamentData;
}

const TournamentListElement: React.FC<TournamentListElementProps> = ({
  data,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-nav-bg-hover p-5 rounded-xl flex gap-5 border-2 border-main-default">
      <div className="w-1/4 flex justify-center items-center">
        <Image
          src="https://t4.ftcdn.net/jpg/04/38/89/23/360_F_438892395_rBFn1ok5VpKxI9Qc3cP1ggypplEBkcJS.jpg"
          className="aspect-square w-[130px]"
        />
      </div>
      <div className="w-3/4 flex flex-col gap-3 justify-center items-center">
        <p className="text-2xl">{data.name}</p>
        <span className="text-[13px] text-center flex items-center gap-2">
          <span className="flex gap-2">
            <span>{data.startDate.toLocaleDateString()}</span>
            <span>-</span>
            <span>{data.endDate.toLocaleDateString()}</span>
          </span>
          <FaCalendar />
        </span>
        <div className="flex gap-5">
          <button
            className="flex items-center justify-around w-[150px] bg-main-default p-2 rounded-lg text-black"
            onClick={() => navigate(`/zawody/${data.tournamentId}/wyniki`)}
          >
            <FaTable />
            <span>Tabela</span>
          </button>
          <button
            className="flex items-center justify-around w-[150px] p-2 rounded-lg bg-black"
            onClick={() => navigate(`/zawody/${data.tournamentId}/edycja`)}
          >
            <FaEdit />
            <span>Edytuj</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TournamentListElement;
