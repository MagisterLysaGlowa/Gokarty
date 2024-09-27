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
import Modal from "../../components/Modal/Modal";
import { promiseToast } from "../../Utils/ToastNotifications";

export const SchoolManagement = () => {
  const [schools, setSchools] = useState<Array<SchoolData>>([]);
  const [formEditId, setFormEditId] = useState<number>(-1);
  const [formData, setFormData] = useState<SchoolFormData>({
    name: "",
    city: "",
    acronym: "",
  } as SchoolFormData);
  const [schoolToDelete, setSchoolToDelete] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const {
    isLoading,
    isFetching,
    refetch: refetchSchools,
  } = useQuery("schoolManagementGetSchools", async () => get_all_schools(), {
    onSuccess: (res) => {
      setSchools(res);
    },
  });

  const updateSchool = useMutation(
    async (data: SchoolFormData) =>
      await promiseToast(update_school(Number(formEditId), data), {
        error: "Błąd podczas aktualizacji szkoły",
        pending: "W trakcie aktualizowania szkoły",
        success: "Pomyślnie uaktualniono szkołe",
      }),
    {
      onSuccess: async () => {
        await refetchSchools();
        setFormData({ name: "", city: "", acronym: "" } as SchoolFormData);
        setFormEditId(-1);
      },
    }
  );

  const insertSchool = useMutation(
    async (data: SchoolFormData) =>
      await promiseToast(create_school(data), {
        error: "Błąd podczas tworzenia szkoły",
        pending: "W trakcie tworzenia szkoły",
        success: "Pomyślnie utworzono szkołe",
      }),
    {
      onSuccess: async () => {
        await refetchSchools();
        setFormData({ name: "", city: "", acronym: "" } as SchoolFormData);
      },
    }
  );

  const deleteSchool = useMutation(
    async (id: number) =>
      await promiseToast(remove_school(id), {
        error: "Błąd podczas usuwania szkoły",
        pending: "W trakcie usuwania szkoły",
        success: "Pomyślnie usunięto szkołe",
      }),
    {
      onSuccess: async () => {
        await refetchSchools();
      },
    }
  );

  function formSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log(formData);
    if (formEditId != -1) {
      updateSchool.mutate(formData);
    } else {
      insertSchool.mutate(formData);
    }
  }

  function editClick(schoolId: number) {
    setFormEditId(schoolId);
    setFormData(
      schools.find((school) => school.schoolId == schoolId) ??
        ({ name: "", city: "", acronym: "" } as SchoolFormData)
    );
  }

  function editCancel() {
    setFormEditId(-1);
    setFormData({ name: "", city: "", acronym: "" } as SchoolFormData);
  }

  if (isLoading || isFetching) return;
  return (
    <div className="schoolManagement">
      <form onSubmit={formSubmit}>
        <h3>{formEditId == -1 ? "Dodaj szkołę" : "Edytuj szkołę"}</h3>
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
        {formEditId != -1 && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              editCancel();
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
            {schools.map((school, i) => {
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
                        editClick(school.schoolId);
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
                      onClick={() => {
                        setSchoolToDelete(school.schoolId);
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
      <Modal
        id="deleteModal"
        onConfirm={() => {
          if (schoolToDelete != null)
            deleteSchool.mutate(schoolToDelete as number);
        }}
        onAbort={() => {
          setSchoolToDelete(null);
        }}
        title="Czy na pewno chcesz usunąć tą szkołę"
        message={
          schools.find((school) => school.schoolId == schoolToDelete)?.name
        }
      />
    </div>
  );
};
