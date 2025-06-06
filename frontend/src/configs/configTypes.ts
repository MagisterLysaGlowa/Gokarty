export type Colors =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type Sizes = "sm" | "md" | "lg";
export type Radii = "none" | "sm" | "md" | "lg" | "full";

export type ButtonVariant =
  | "solid"
  | "bordered"
  | "light"
  | "flat"
  | "faded"
  | "shadow"
  | "ghost";

export type BasicVariants = "flat" | "bordered" | "faded" | "underlined";

export type BasicStyles = {
  color?: Colors;
  size?: Sizes;
  radius?: Radii;
};
export type BasicProps = BasicStyles & { variant?: BasicVariants };
