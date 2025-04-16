import { useNavigate } from "react-router-dom";
import { TournamentData } from "../../../types";
import { Image } from "@heroui/react";
import { FaCalendar, FaEdit, FaTable } from "react-icons/fa";
import { displayDateRange } from "../../Utils/TimeUtils";
import { imagesPath } from "../../Utils/globalUtils";


interface TournamentListElementProps {
  data: TournamentData;
}

const TournamentListElement: React.FC<TournamentListElementProps> = ({
  data,
}) => {
  const navigate = useNavigate();

  return (
    <div className={`bg-nav-bg-hover rounded-xl gap-5 border-2 pb-5 grid grid-rows-[70%-30%] border-main-default`}>
      <span className={`text-center w-auto rounded-t-lg m-1 ${data.tournamentStateId==1 ? "bg-main-default" : data.tournamentStateId==2 ? "bg-green-500" : "bg-red-600"}`}>{data.tournamentState?.state}</span>
      <div className=" flex justify-center items-center">
        <Image
          src={imagesPath + data.image}
          className="aspect-square 2xl:w-[250px] xl:w-[225px] lg:w-[225px] w-[200px]"
        />
      </div>
      <div>
        <div className=" flex flex-col gap-3 justify-center items-center">
          <p className="text-pretty text-lg text-center">{data.name}</p>
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
              <FaTable className="fill-white" />
              <span className="text-white">Tabela</span>
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
