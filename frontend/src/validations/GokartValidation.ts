import * as yup from "yup";
import { GokartFormData } from "../../types";
import { errorToast } from "../Utils/ToastNotifications";

const gokartValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa jest wymagana")
    .min(5, "Nazwa gokartu musi mieć ponad 5 znaków")
    .max(30, "Nazwa gokartu musi mieć mniej niż 30 znaków"),
});

export const gokartValidate = async (data: GokartFormData) => {
  try {
    await gokartValidationSchema.validate(data);
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errorToast(err.errors[0]);
    }
    return false;
  }
};
