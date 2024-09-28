import { useQuery } from "react-query";
import "./RideRandomization.css";
import { useState } from "react";
import { get_all_gokarts } from "../../services/gokart";
import { sortListElements } from "./RideRandomizationUtils";

const RideRandomization = () => {
  const {
    data: allGokarts,
    isLoading: gokartsLoading,
    isFetching: gokartFetching,
  } = useQuery("getAllGokarts", async () => await get_all_gokarts());

  const [selectedGokarts, SetSelectedGokarts] = useState<number[]>([]);
  return (
    <div
      className="p-3 d-flex flex-column randomizeContainer"
      style={{ gap: "10px" }}
    >
      <h3>Losowanie przejazdów</h3>
      <div>
        <label className="p-1">Ile przejazdów na gokart</label>
        <input type="number" className="form-control" />
      </div>
      <div className="d-flex flex-column" style={{ gap: "8px" }}>
        <label className="p-1">Wybierz gokarty do przejazdów</label>
        <div className="gokartListContainer">
          {!gokartFetching && !gokartsLoading ? (
            allGokarts
              ?.sort((a, b) => sortListElements(selectedGokarts, a, b))
              .map((gokart) => (
                <div
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
        <button className="btn btn-primary" style={{ width: "200px" }}>
          Wylosuj
        </button>
      </div>
    </div>
  );
};
export default RideRandomization;
