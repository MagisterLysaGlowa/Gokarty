import { errorToast } from "../Utils/ToastNotifications";
import * as yup from "yup";

export const validateData = async <T>(
  validationSchema: yup.ObjectSchema<object>,
  data: T
) => {
  try {
    await validationSchema.validate(data);
    return true;
  } catch (err) {
    if (err instanceof yup.ValidationError) {
      errorToast(err.errors[0]);
    }
    return false;
  }
};
