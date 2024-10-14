import * as yup from "yup";
import { errorToast } from "../Utils/ToastNotifications";
import { QueueFormData } from "../../types";

const QueueRandomizationValidationSchema = yup.object().shape({
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

export const queueValidation = async (data: QueueFormData) => {
  try {
    await QueueRandomizationValidationSchema.validate(data);
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errorToast(err.errors[0]);
    }
    return false;
  }
};
