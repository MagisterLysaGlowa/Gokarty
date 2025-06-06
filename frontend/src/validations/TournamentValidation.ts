import * as yup from "yup";

export const tournamentValidateSchema = yup.object().shape({
  name: yup
    .string()
    .required("Nazwa jest wymagana")
    .min(5, "Nazwa zawodów musi mieć ponad 5 znaków")
    .max(50, "Nazwa zawodów musi mieć mniej niż 50 znaków"),
  startDate: yup.date().required(),
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
  tournamentStateId: yup
    .number()
    .required()
    .min(0, "Stan zawodów jest wymagany"),
  tournamentTypeId: yup
    .number()
    .required()
    .min(1, "Rodzaj zawodów jest wymagany"),
});
