import * as yup from "yup";

export const gokartValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa jest wymagana")
    .min(5, "Nazwa gokartu musi mieć ponad 5 znaków")
    .max(30, "Nazwa gokartu musi mieć mniej niż 30 znaków"),
});
