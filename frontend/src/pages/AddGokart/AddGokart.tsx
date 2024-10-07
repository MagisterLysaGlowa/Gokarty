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

import {
  createGokartTexts,
  promiseToast,
  removeGokartTexts,
  updateGokartTexts,
} from "../../Utils/ToastNotifications";
import { useModal } from "../../components/Modal/useModal";
import { buildButton } from "../../components/Modal/Utils";

export const AddGokart = () => {
  const modal = useModal();
  const [gokart, Setgokart] = useState<GokartFormData>({} as GokartFormData);
  const [selectedGokartId, SetSelectedGokartId] = useState<number>(-1);

  const {
    isLoading: isGokartsLoading,
    isFetching: isGokartsFetching,
    data: allGokart,
    refetch: refetchGokarts,
  } = useQuery("getGokart", async () => await get_all_gokarts());

  const { mutate: createGokart } = useMutation(
    async (data: GokartFormData) =>
      await promiseToast(create_gokart(data), createGokartTexts),
    {
      onSuccess: async () => await refetchGokarts(),
    }
  );

  const { mutateAsync: removeGokart } = useMutation(
    async (id: number) =>
      await promiseToast(remove_gokart(id), removeGokartTexts),
    {
      onSuccess: async () => await refetchGokarts(),
    }
  );

  const { mutate: updateGokart } = useMutation(
    async (data: GokartFormData) =>
      await promiseToast(
        update_gokart(selectedGokartId, data),
        updateGokartTexts
      )
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
                  onClick={() => {
                    SetSelectedGokartId(-1);
                    Setgokart({ name: "" });
                  }}
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
                      onClick={() => {
                        modal.openModal({
                          title: "Czy napewno chcesz usunąć gokart?",
                          content: gokart.name,
                          buttons: [
                            buildButton("btn btn-secondary", "Anuluj"),
                            buildButton(
                              "btn btn-primary",
                              "Usuń",
                              async () => await removeGokart(gokart.gokartId)
                            ),
                          ],
                        });
                      }}
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
    </div>
  );
};
