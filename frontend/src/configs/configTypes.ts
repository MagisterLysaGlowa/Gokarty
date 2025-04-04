export type Variants =
  | "solid"
  | "bordered"
  | "light"
  | "flat"
  | "faded"
  | "shadow"
  | "ghost";
export type Colors =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "danger";
export type Sizes = "sm" | "md" | "lg";
export type Radii = "none" | "sm" | "md" | "lg" | "full";

export type BasicStyles = {
  color?: Colors;
  variant?: Variants;
  size?: Sizes;
  radius?: Radii;
};
