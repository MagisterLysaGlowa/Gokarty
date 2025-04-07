import "./tournamentListElement.css";
import { useNavigate } from "react-router-dom";
import { TournamentData } from "../../../types";
import { Image } from "@heroui/react";
import { FaCalendar, FaEdit, FaTable } from "react-icons/fa";
import { displayDateRange } from "../../Utils/TimeUtils";

interface TournamentListElementProps {
  data: TournamentData;
}

const TournamentListElement: React.FC<TournamentListElementProps> = ({
  data,
}) => {
  const navigate = useNavigate();

  return (
    <div className="bg-nav-bg-hover p-5 rounded-xl gap-5 border-2 grid grid-rows-[70%-30%] border-main-default">
      <div className=" flex justify-center items-center">
        <Image
          src="https://t4.ftcdn.net/jpg/04/38/89/23/360_F_438892395_rBFn1ok5VpKxI9Qc3cP1ggypplEBkcJS.jpg"
          className="aspect-square 2xl:w-[250px] xl:w-[225px] lg:w-[225px] w-[200px]"
        />
      </div>
      <div>
        <div className=" flex flex-col gap-3 justify-center items-center">
          <p className="text-2xl">{data.name}</p>
          <span className="text-[13px] text-center flex items-center gap-2">
            <span className="flex gap-2">
              {displayDateRange(data.startDate, data.endDate)}
            </span>
            <FaCalendar />
          </span>
          <div className="flex gap-5 w-[80%]">
            <button
              className="flex items-center justify-around w-full bg-main-default p-2 rounded-lg text-black hover:bg-yellow-300 duration-300"
              onClick={() => navigate(`/zawody/${data.tournamentId}/wyniki`)}
            >
              <FaTable />
              <span>Tabela</span>
            </button>
            <button
              className="flex items-center justify-around w-full p-2 rounded-lg bg-black hover:bg-zinc-800 duration-300"
              onClick={() =>
                navigate(`/zawody/${data.tournamentId}/${data.name}`)
              }
            >
              <FaEdit />
              <span>Edytuj</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TournamentListElement;
