import { ButtonVariant, BasicStyles } from "./configTypes";

type ButtonSpinnerPlacement = "start" | "end";

export type ButtonProps = BasicStyles & {
  spinnerPlacement?: ButtonSpinnerPlacement;
  variant?: ButtonVariant;
};

export const confirmButtonConfig: ButtonProps = {
  variant: "solid",
  color: "primary",
  size: "md",
  radius: "md",
  spinnerPlacement: "start",
};

export const cancelButtonConfig: ButtonProps = {
  variant: "flat",
  color: "danger",
  radius: "md",
  size: "md",
};

export const restartButtonConfig: ButtonProps = {
  variant: "solid",
  color: "secondary",
  radius: "md",
  size: "md",
};
