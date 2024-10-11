import { useMutation, useQuery } from "react-query";
import "./schoolManagement.css";
import {
  create_school,
  get_all_schools,
  remove_school,
  update_school,
} from "../../services/school";
import { useState } from "react";
import { SchoolData, SchoolFormData } from "../../../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit } from "@fortawesome/free-regular-svg-icons/faEdit";
import { faTrash } from "@fortawesome/free-solid-svg-icons/faTrash";

import {
  createSchoolTexts,
  promiseToast,
  removeSchoolTexts,
  updateSchoolTexts,
} from "../../Utils/ToastNotifications";
import { useModal } from "../../components/Modal/useModal";
import { buildButton } from "../../components/Modal/Utils";
import { schoolValidate } from "../../validations/SchoolValidation";
import {
  addSchoolToList,
  removeSchoolFromList,
  resetSchoolValues,
  updateCertainSchool,
} from "./SchoolManagementUtils";

export const SchoolManagement = () => {
  const modal = useModal();
  const [formData, setFormData] = useState<SchoolData>(resetSchoolValues);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const {
    data: schools,
    isLoading,
    isFetching,
  } = useQuery("schoolManagementGetSchools", async () => get_all_schools());

  const updateSchool = useMutation(
    async (data: SchoolFormData) =>
      await promiseToast(
        update_school(Number(formData.schoolId), data),
        updateSchoolTexts
      ),
    {
      onSuccess: async (school) => {
        updateCertainSchool(school);
        setFormData(resetSchoolValues);
      },
    }
  );

  const insertSchool = useMutation(
    async (data: SchoolFormData) =>
      await promiseToast(create_school(data), createSchoolTexts),
    {
      onSuccess: async (school) => {
        addSchoolToList(school);
        setFormData(resetSchoolValues);
      },
    }
  );

  const deleteSchool = useMutation(
    async (id: number) =>
      await promiseToast(remove_school(id), removeSchoolTexts),
    {
      onSuccess: async (id) => removeSchoolFromList(id),
    }
  );

  async function formSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!(await schoolValidate(formData))) return;
    if (formData.schoolId != -1) {
      await updateSchool.mutateAsync(formData);
    } else {
      await insertSchool.mutateAsync(formData);
    }
  }

  if (isLoading || isFetching) return;
  return (
    <div className="schoolManagement">
      <form onSubmit={formSubmit}>
        <h3>{formData.schoolId == -1 ? "Dodaj szkołę" : "Edytuj szkołę"}</h3>
        <div>
          <label htmlFor="name">Nazwa szkoły</label>
          <input
            type="text"
            id="name"
            name="name"
            className="form-control"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="city">Miasto</label>
          <input
            type="text"
            id="city"
            name="city"
            className="form-control"
            value={formData.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="acronym">Akronim</label>
          <input
            type="text"
            id="acronym"
            name="acronym"
            className="form-control"
            value={formData.acronym}
            onChange={handleChange}
          />
        </div>
        {formData.schoolId != -1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setFormData(resetSchoolValues);
            }}
          >
            Anuluj
          </button>
        )}
        <button type="submit" className="btn btn-primary">
          Zatwierdź
        </button>
      </form>
      <div className="schoolsTable">
        <table className="table table-striped">
          <thead className="table-dark">
            <tr>
              <th>Lp</th>
              <th>Nazwa</th>
              <th>Miasto</th>
              <th>Akronim</th>
              <th>Edytuj</th>
              <th>Usuń</th>
            </tr>
          </thead>
          <tbody>
            {schools?.map((school, i) => {
              return (
                <tr key={school.schoolId}>
                  <td>{i + 1}</td>
                  <td>{school.name}</td>
                  <td>{school.city}</td>
                  <td>{school.acronym}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => {
                        setFormData(school);
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
                          title: "Czy napewno chcesz usunąć szkołe?",
                          content: school.name,
                          buttons: [
                            buildButton("btn btn-secondary", "Anuluj"),
                            buildButton("btn btn-primary", "Usuń", async () =>
                              deleteSchool.mutateAsync(school.schoolId)
                            ),
                          ],
                        });
                      }}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
