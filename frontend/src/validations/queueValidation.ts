import * as yup from "yup";

export const queueValidationSchema = yup.object().shape({
  gokartIds: yup
    .array()
    .required("Wymagany conajmniej 1 pojazd")
    .min(1, "Wymagany conajmniej 1 pojazd"),
  numberOfRidesInOneGokart: yup
    .number()
    .required()
    .min(1, "Minimalna liczba przejazdów to 1"),
  tournamentId: yup.number().required(),
});
