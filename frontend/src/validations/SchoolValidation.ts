import * as yup from "yup";
import { SchoolFormData } from "../../types";
import { errorToast } from "../Utils/ToastNotifications";

const schoolValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa jest wymagana")
    .min(5, "Nazwa szkoła musi mieć ponad 5 znaków")
    .max(40, "Nazwa szkoły musi mieć mniej niż 40 znaków"),
  city: yup
    .string()
    .required("Miasto jest wymagane")
    .min(5, "Miasto musi mieć ponad 5 znaków")
    .max(40, "Miasto musi mieć mniej niż 40 znaków"),
  acronym: yup
    .string()
    .required("Skrót jest wymagany")
    .min(2, "Skrót musi mieć ponad 2 znaki")
    .max(20, "Skrót musi mieć mniej niż 20 znaków"),
});

export const schoolValidate = async (data: SchoolFormData) => {
  try {
    await schoolValidationSchema.validate(data);
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) errorToast(error.errors[0]);
    return false;
  }
};
