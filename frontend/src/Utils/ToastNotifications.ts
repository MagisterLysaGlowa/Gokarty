import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
  closeButton: true,
  theme: "dark",
  pauseOnHover: false,
  closeOnClick: true,
};

interface promiseToastStatesText {
  pending: string;
  success: string;
  error: string;
}

export const successToast = (text: string) => toast.success(text, options);
export const errorToast = (text: string) => toast.error(text, options);
export const infoToast = (text: string) => toast.info(text, options);
export const promiseToast = async <T>(
  promiese: Promise<T>,
  texts: promiseToastStatesText
) =>
  await toast
    .promise(promiese, texts, options)
    .then(async (res) => (await res) as T);

//Gokarty
export const createGokartTexts: promiseToastStatesText = {
  error: "Błąd podczas dodawania gokartu.",
  pending: "W trakcie dodawania gokartu.",
  success: "Pomyślnie dodano gokart",
};

export const updateGokartTexts: promiseToastStatesText = {
  error: "Pomyślnie uaktualniono gokart.",
  pending: "W trakcie aktualizowania gokartu.",
  success: "Pomyślnie uaktualniono gokart.",
};

export const removeGokartTexts: promiseToastStatesText = {
  error: "Pomyślnie usunięto gokart.",
  pending: "W trakcie usuwania gokartu.",
  success: "Pomyślnie usunięto gokart.",
};

//Zawodnicy
export const createPlayerTexts: promiseToastStatesText = {
  error: "Błąd podczas dodawania zawodnika.",
  pending: "W trakcie dodawania zawodnika.",
  success: "Pomyślnie dodano zawodnika.",
};

export const updatePlayerTexts: promiseToastStatesText = {
  error: "Pomyślnie uaktualniono zawodnika.",
  pending: "W trakcie aktualizowania zawodnika.",
  success: "Pomyślnie uaktualniono zawodnika.",
};

export const removePlayerTexts: promiseToastStatesText = {
  error: "Pomyślnie usunięto zawodnika.",
  pending: "W trakcie usuwania zawodnika.",
  success: "Pomyślnie usunięto zawodnika.",
};

//Szkoła
export const createSchoolTexts: promiseToastStatesText = {
  error: "Błąd podczas dodawania szkoły.",
  pending: "W trakcie dodawania szkołe.",
  success: "Pomyślnie dodano szkołe.",
};

export const updateSchoolTexts: promiseToastStatesText = {
  error: "Pomyślnie uaktualniono szkołe.",
  pending: "W trakcie aktualizowania szkoły.",
  success: "Pomyślnie uaktualniono szkołe.",
};

export const removeSchoolTexts: promiseToastStatesText = {
  error: "Pomyślnie usunięto szkołe.",
  pending: "W trakcie usuwania szkoły.",
  success: "Pomyślnie usunięto szkołe.",
};

//Zawody
export const createTournamentTexts: promiseToastStatesText = {
  error: "Błąd podczas dodawania zawodów.",
  pending: "W trakcie dodawania zawodów.",
  success: "Pomyślnie dodano zawody.",
};

export const updateTournamentTexts: promiseToastStatesText = {
  error: "Pomyślnie uaktualniono zawody.",
  pending: "W trakcie aktualizowania zawodów.",
  success: "Pomyślnie uaktualniono zawody.",
};

export const removeTournamentTexts: promiseToastStatesText = {
  error: "Pomyślnie usunięto zawody.",
  pending: "W trakcie usuwania zawodów.",
  success: "Pomyślnie usunięto zawody.",
};

//Przejazd
export const createRideTexts: promiseToastStatesText = {
  error: "Błąd podczas dodawania przejazdu.",
  pending: "W trakcie dodawania przejazdu.",
  success: "Pomyślnie dodano przejazd.",
};

export const updateRideTexts: promiseToastStatesText = {
  error: "Pomyślnie uaktualniono przejazd.",
  pending: "W trakcie aktualizowania przejazdu.",
  success: "Pomyślnie uaktualniono przejazd.",
};

export const removeRideTexts: promiseToastStatesText = {
  error: "Pomyślnie usunięto przejazd.",
  pending: "W trakcie usuwania przejazd.",
  success: "Pomyślnie usunięto przejazd.",
};

//Kolejka

export const createQueueTexts: promiseToastStatesText = {
  error: "Błąd podczas tworzenia kolejki",
  pending: "W trakcie tworzenia kolejki",
  success: "Pomyślnie utworzono kolejke",
};
