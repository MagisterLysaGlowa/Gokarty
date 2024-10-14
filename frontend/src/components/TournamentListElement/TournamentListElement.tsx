import "./tournamentListElement.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTableList } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { TournamentData } from "../../../types";

interface TournamentListElementProps {
  data: TournamentData;
}

const TournamentListElement: React.FC<TournamentListElementProps> = ({
  data,
}) => {
  const navigate = useNavigate();

  return (
    <div style={{ padding: "5px", width: "100%" }}>
      <div className="tournamentListElementContiner p-3">
        <img
          src="https://t4.ftcdn.net/jpg/04/38/89/23/360_F_438892395_rBFn1ok5VpKxI9Qc3cP1ggypplEBkcJS.jpg"
          alt="logo"
        />
        <div className="tournamentContent">
          <h5>{data.name}</h5>
          <p>{new Date(data.startDate).toLocaleDateString()}</p>
          <p>{new Date(data.endDate).toLocaleDateString()}</p>
        </div>
        <div className="tournamentsControls">
          <button
            className="btn btn-dark"
            onClick={() => {
              navigate(`/zawody/${data.tournamentId}/wyniki`);
            }}
          >
            <FontAwesomeIcon icon={faTableList} />
            <span>Tabela</span>
          </button>
          <button
            className="btn btn-light"
            onClick={() => {
              navigate(`/zawody/${data.tournamentId}/edycja/`);
            }}
          >
            <FontAwesomeIcon icon={faPenToSquare} />
            <span>Modyfikacja</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default TournamentListElement;
