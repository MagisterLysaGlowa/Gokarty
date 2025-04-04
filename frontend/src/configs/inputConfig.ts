type InputVariant = "flat" | "bordered" | "faded" | "underlined";
type InputColor =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
type InputSize = "sm" | "md" | "lg";
type InputRadius = "none" | "sm" | "md" | "lg" | "full";
type InputType =
  | "text"
  | "email"
  | "url"
  | "password"
  | "tel"
  | "search"
  | "file";
type LabelPlacement = "inside" | "outside" | "outside-left";
type ValidationBehavior = "native" | "aria";

export type InputConfigProps = {
  variant?: InputVariant;
  color?: InputColor;
  size?: InputSize;
  radius?: InputRadius;
  type?: InputType;
  labelPlacement?: LabelPlacement;
  validationBehavior?: ValidationBehavior;
};

export const inputConfig: InputConfigProps = {
  variant: "flat",
  color: "default",
  size: "md",
  radius: "md",
  type: "text",
};
