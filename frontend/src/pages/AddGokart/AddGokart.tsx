import { useState } from "react";
import "./AddGokart.css";
import { GokartFormData } from "../../../types";
import { handleChange } from "../TournamentEdit/TournamentEditUtils";
import { useMutation, useQuery } from "react-query";
import {
  create_gokart,
  get_all_gokarts,
  remove_gokart,
  update_gokart,
} from "../../services/gokart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "../../components/componentsExport";

export const AddGokart = () => {
  const [gokart, Setgokart] = useState<GokartFormData>({} as GokartFormData);
  const [selectedGokartId, SetSelectedGokartId] = useState<number>(-1);
  const {
    isLoading: isGokartsLoading,
    isFetching: isGokartsFetching,
    data: allGokart,
    refetch: refetchGokarts,
  } = useQuery("getGokart", async () => await get_all_gokarts());

  const { mutate: createGokart } = useMutation(
    async (data: GokartFormData) => await create_gokart(data),
    {
      onSuccess: async () => {
        console.log(1);
        await refetchGokarts();
      },
      onError: () => {
        console.log(2);
      },
    }
  );

  const { mutate: removeGokart } = useMutation(
    async (id: number) => await remove_gokart(id),
    {
      onSuccess: async () => {
        await refetchGokarts();
      },
      onError: () => {
        console.log(2);
      },
    }
  );

  const { mutate: updateGokart } = useMutation(
    async (data: GokartFormData) => await update_gokart(selectedGokartId, data),
    {
      onSuccess: async () => {
        await refetchGokarts();
      },
      onError: () => {},
    }
  );

  return (
    <div className="p-5">
      <div className="gokartContainer">
        <div className="gokartForm" onSubmit={(e) => e.preventDefault()}>
          <form>
            <h3>{(selectedGokartId == -1 ? "Dodaj" : "Edytuj") + " gokart"}</h3>
            <input
              type="text"
              name="name"
              className="form-control"
              value={gokart.name}
              onChange={(e) => handleChange(e, Setgokart)}
            />
            {selectedGokartId != -1 ? (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => SetSelectedGokartId(-1)}
                >
                  Anuluj
                </button>
                <button
                  className="btn btn-primary"
                  onClick={() => updateGokart(gokart)}
                >
                  Zatwierdź
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => createGokart(gokart)}
              >
                Zatwierdź
              </button>
            )}
          </form>
        </div>
        {!isGokartsLoading && !isGokartsFetching ? (
          <table className="table table-striped">
            <thead className="table-dark">
              <tr>
                <th>Lp.</th>
                <th>Name</th>
                <th>Edytuj</th>
                <th>Usuń</th>
              </tr>
            </thead>
            <tbody>
              {allGokart?.map((gokart) => (
                <tr key={gokart.gokartId}>
                  <td>{gokart.gokartId}</td>
                  <td>{gokart.name}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        Setgokart(
                          allGokart.find(
                            (z) => z.gokartId == gokart.gokartId
                          ) ?? { name: "" }
                        );
                        SetSelectedGokartId(gokart.gokartId);
                      }}
                    >
                      <FontAwesomeIcon icon={faEdit} />
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteModal"
                      onClick={() => SetSelectedGokartId(gokart.gokartId)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Modal
        id="deleteModal"
        onConfirm={() => removeGokart(Number(selectedGokartId))}
        onAbort={() => {
          SetSelectedGokartId(-1);
        }}
        title="Czy na pewno chcesz usunąć tego gokarta?"
        message={allGokart?.find((z) => z.gokartId == selectedGokartId)?.name}
      />
    </div>
  );
};
