import * as yup from "yup";

export const classValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa jest wymagana")
    .min(2, "Nazwa klasy musi mieć minimum 2 znaki")
    .max(40, "Nazwa klasy musi mieć mniej niż 40 znaków"),
});