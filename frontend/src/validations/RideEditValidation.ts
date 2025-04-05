import * as yup from "yup";

export const rideValidation = yup.object().shape({
  gokartId: yup.number().required().nonNullable().min(1),
  playerId: yup.number().required().nonNullable().min(1),
  tournamentId: yup.number().required().nonNullable().min(1),
  time: yup.number().required().nonNullable(),
  isDisqualified: yup.number().required().nonNullable().min(0).max(1),
});
