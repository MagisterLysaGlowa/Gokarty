import { useMutation, useQuery } from "react-query";
import "./RideRandomization.css";
import { useState } from "react";
import { get_all_gokarts } from "../../services/gokart";
import { sortListElements } from "./RideRandomizationUtils";
import { create_queue } from "../../services/queue";
import { useNavigate, useParams } from "react-router-dom";
import { promiseToast } from "../../Utils/ToastNotifications";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

interface Props {
  refetch: () => void;
}

const RideRandomization: React.FC<Props> = ({ refetch }) => {
  const {
    data: allGokarts,
    isLoading: gokartsLoading,
    isFetching: gokartFetching,
  } = useQuery("getAllGokarts", async () => await get_all_gokarts());
  const { id } = useParams();
  const [selectedGokarts, SetSelectedGokarts] = useState<number[]>([]);
  const [gokartsPerRides, SetGokartsPerRides] = useState<number>();
  const navigate = useNavigate();
  const { mutateAsync: createQueue } = useMutation(
    async () =>
      await promiseToast(
        create_queue({
          gokartIds: selectedGokarts,
          numberOfRidesInOneGokart: Number(gokartsPerRides),
          tournamentId: Number(id),
        }),
        { error: "Błąd", pending: "W trakcie", success: "Dodano" }
      ),
    {
      onSuccess: () => {
        refetch();
      },
    }
  );

  return (
    <div
      className="p-3 d-flex flex-column randomizeContainer"
      style={{ gap: "10px" }}
    >
      <h3>Losowanie przejazdów</h3>
      <div>
        <label className="p-1">Ilość przejazdów na gokart</label>
        <input
          type="number"
          className="form-control"
          onChange={(e) => SetGokartsPerRides(Number(e.target.value))}
        />
      </div>
      <div className="d-flex flex-column" style={{ gap: "8px" }}>
        <div className="d-flex gap-1 align-items-center">
          <label className="p-1">Wybierz gokarty do przejazdów</label>
          <button
            className="btn btn-primary"
            onClick={() => navigate("/gokart")}
          >
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
        <div className="gokartListContainer">
          {!gokartFetching && !gokartsLoading ? (
            allGokarts
              ?.sort((a, b) => sortListElements(selectedGokarts, a, b))
              .map((gokart) => (
                <div
                  key={gokart.gokartId}
                  className="d-flex align-items-center gokartListElement"
                  style={{ gap: "10px" }}
                  onClick={() => {
                    if (selectedGokarts.includes(gokart.gokartId))
                      SetSelectedGokarts(
                        selectedGokarts.filter((z) => z != gokart.gokartId)
                      );
                    else
                      SetSelectedGokarts([...selectedGokarts, gokart.gokartId]);
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedGokarts.includes(gokart.gokartId)}
                  />
                  <label>{gokart.name}</label>
                </div>
              ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <button
          className="btn btn-primary"
          style={{ width: "200px" }}
          onClick={async () => {
            await createQueue();
          }}
        >
          Wylosuj
        </button>
      </div>
    </div>
  );
};
export default RideRandomization;
