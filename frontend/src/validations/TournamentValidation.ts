import * as yup from "yup";
import { TournamentFormData } from "../../types";
import { errorToast } from "../Utils/ToastNotifications";

const createTournamentValidateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa jest wymagana")
    .min(5, "Nazwa zawodów musi mieć ponad 5 znaków")
    .max(30, "Nazwa zawodów musi mieć mniej niż 30 znaków"),
  startDate: yup
    .date()
    .required()
    .test(
      "is-valid",
      "Data rozpoczęcia nie może być mniejsza od dzisiejszej daty",
      function (value) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (value) {
          const startDate = new Date(value);
          startDate.setHours(0, 0, 0, 0);
          return startDate >= today;
        }
        return false;
      }
    ),
  endDate: yup
    .date()
    .required()
    .test(
      "is-greater",
      "Data zakończenia musi być większa lub równa dacie rozpoczęcia",
      function (value) {
        const { startDate } = this.parent;
        return value && startDate ? value >= startDate : true;
      }
    ),
  tournamentStateId: yup.number().min(0, "Stan zawodów jest wymagany"),
});

export const tournamentValidate = async (data: TournamentFormData) => {
  try {
    await createTournamentValidateSchema.validate(data, { abortEarly: false });
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      errorToast(error.errors[0]);
    }
    return false;
  }
};
