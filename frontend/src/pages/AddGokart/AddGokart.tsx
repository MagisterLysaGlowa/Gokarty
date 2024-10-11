import { useState } from "react";
import "./AddGokart.css";
import { GokartData, GokartFormData } from "../../../types";
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
import { gokartValidate } from "../../validations/GokartValidation";
import {
  AddCreatedGokartToList,
  EditCertainGokartInList,
  RemoveCreatedGokartFromList,
  resetGokartValues,
} from "./AddGokartUtils";

export const AddGokart = () => {
  const modal = useModal();
  const [gokart, Setgokart] = useState<GokartData>({
    name: "",
    gokartId: -1,
  });

  const { data: allGokarts } = useQuery(
    "getGokarts",
    async () => await get_all_gokarts()
  );

  const { mutateAsync: createGokart } = useMutation(
    async (data: GokartFormData) =>
      await promiseToast(create_gokart(data), createGokartTexts),
    {
      onSuccess: async (res) => {
        await AddCreatedGokartToList(res);
        Setgokart(resetGokartValues);
      },
    }
  );

  const { mutateAsync: removeGokart } = useMutation(
    async (id: number) =>
      await promiseToast(remove_gokart(id), removeGokartTexts),
    {
      onSuccess: async (id) => await RemoveCreatedGokartFromList(id),
    }
  );

  const { mutateAsync: updateGokart } = useMutation(
    async (data: GokartFormData) =>
      await promiseToast(
        update_gokart(gokart.gokartId, data),
        updateGokartTexts
      ),
    {
      onSuccess: async (gokart) => {
        await EditCertainGokartInList(gokart);
        Setgokart(resetGokartValues);
      },
    }
  );

  return (
    <div className="p-5">
      <div className="gokartContainer">
        <div className="gokartForm" onSubmit={(e) => e.preventDefault()}>
          <form>
            <h3>{(gokart.gokartId == -1 ? "Dodaj" : "Edytuj") + " gokart"}</h3>
            <input
              type="text"
              name="name"
              className="form-control"
              value={gokart.name}
              onChange={(e) => handleChange(e, Setgokart)}
            />
            {gokart.gokartId != -1 ? (
              <>
                <button
                  className="btn btn-secondary"
                  onClick={() => {
                    Setgokart(resetGokartValues);
                  }}
                >
                  Anuluj
                </button>
                <button
                  className="btn btn-primary"
                  onClick={async () => {
                    if (await gokartValidate(gokart)) {
                      await updateGokart(gokart);
                    }
                  }}
                >
                  Zatwierdź
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={async () => {
                  if (await gokartValidate(gokart)) {
                    await createGokart(gokart);
                  }
                }}
              >
                Zatwierdź
              </button>
            )}
          </form>
        </div>
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
            {allGokarts?.map((gokart) => (
              <tr key={gokart.gokartId}>
                <td>{gokart.gokartId}</td>
                <td>{gokart.name}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      Setgokart(
                        allGokarts.find((z) => z.gokartId == gokart.gokartId)!
                      );
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
      </div>
    </div>
  );
};
