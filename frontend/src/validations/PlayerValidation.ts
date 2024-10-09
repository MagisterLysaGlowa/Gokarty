import * as yup from "yup";
import { PlayerFormData } from "../../types";
import { errorToast } from "../Utils/ToastNotifications";

const playerValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Imie jest wymagane")
    .min(3, "Imie musi mieć powyżej 3 znaków")
    .max(30, "Imie musi mieć mniej niż 30 znaków"),
  surname: yup
    .string()
    .required("Nazwisko jest wymagane")
    .min(3, "Nazwisko musi mieć powyżej 3 znaków")
    .max(30, "Nazwisko musi mieć mniej niż 30 znaków"),
  schoolId: yup
    .number()
    .required()
    .nonNullable("Wybierz szkołe")
    .min(1, "Wybierz szkołe"),
  birthDate: yup
    .date()
    .required()
    .test("is-valid", function (value) {
      return value <= new Date();
    }),
});

export const validatePlayer = async (data: PlayerFormData) => {
  try {
    await playerValidationSchema.validate(data);
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) errorToast(error.errors[0]);
    return false;
  }
};
