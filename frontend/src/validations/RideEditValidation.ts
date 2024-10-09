import * as yup from "yup";
import { RideFormData } from "../../types";
import { errorToast } from "../Utils/ToastNotifications";

const rideValidation = yup.object().shape({
  gokartId: yup.number().required().nonNullable().min(1),
  playerId: yup.number().required().nonNullable().min(1),
  tournamentId: yup.number().required().nonNullable().min(1),
  time: yup.number().required().nonNullable(),
  isDisqualified: yup.number().required().nonNullable().min(0).max(1),
});

export const validateRide = async (data: RideFormData) => {
  try {
    await rideValidation.isValid(data);
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) errorToast(error.errors[0]);
    return false;
  }
};
