import * as yup from "yup";
import { TournamentFormData } from "../../types";
import { errorToast } from "../Utils/ToastNotifications";

const createTournamentValidateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa jest wymagana")
    .min(5, "Nazwa zawodów musi mieć ponad 5 znaków")
    .max(30, "Nazwa zawodów musi mieć mniej niż 30 znaków"),
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
  startDate: yup
    .date()
    .required()
    .test(
      "is-valid",
      "Data rozpoczęcia nie może być mniejsza od dzisiejszej daty",
      function (value) {
        return value >= new Date();
      }
    ),
  tournamentStateId: yup.number().min(0, "Stan zawodów jest wymagany"),
});

export const tournamentValidate = async (data: TournamentFormData) => {
  try {
    await createTournamentValidateSchema.validate(data);
    return true;
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      errorToast(error.errors[0]);
    }
    return false;
  }
};
