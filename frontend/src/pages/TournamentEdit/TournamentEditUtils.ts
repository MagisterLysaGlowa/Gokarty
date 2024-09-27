import { SchoolData } from "../../../types";

export const handleChange = <T extends object>(
  e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  setFunction: React.Dispatch<React.SetStateAction<T>>
) => {
  const { name, value } = e.target;
  setFunction((prev) => ({
    ...prev,
    [name]: !name.includes("Date") ? value : new Date(value),
  }));
};

export const compareFunction = (a: SchoolData, b: SchoolData) => {
  const textA = a.acronym.toUpperCase();
  const textB = b.acronym.toUpperCase();
  return textA < textB ? -1 : textA > textB ? 1 : 0;
};

export const resetPlayerData = () => {
  return {
    birthDate: new Date(),
    name: "",
    playerId: -1,
    schoolId: -1,
    surname: "",
  };
};
