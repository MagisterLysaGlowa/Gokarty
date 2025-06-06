type ModalSize =
  | "xs"
  | "sm"
  | "md"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"
  | "full";

type ModalRadius = "none" | "sm" | "md" | "lg";
type ModalShadow = "none" | "sm" | "md" | "lg";
type ModalBackdrop = "transparent" | "opaque" | "blur";
type ModalPlacement = "auto" | "top" | "bottom" | "center";
type ModalClassNames = Partial<
  Record<
    | "wrapper"
    | "base"
    | "backdrop"
    | "header"
    | "body"
    | "footer"
    | "closeButton",
    string
  >
>;
export type ModalConfigProps = {
  size?: ModalSize;
  radius?: ModalRadius;
  shadow?: ModalShadow;
  backdrop?: ModalBackdrop;
  modalPlacement?: ModalPlacement;
  modalClassNames?: ModalClassNames;
};

export const modalConfig: ModalConfigProps = {
  size: "md",
  radius: "lg",
  shadow: "lg",
  backdrop: "opaque",
};
