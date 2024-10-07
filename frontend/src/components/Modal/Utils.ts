import { ButtonProperties } from "./types";

export const buildButton = (
  cssClass: string,
  text: string,
  onClick?: () => void
): ButtonProperties => {
  return {
    cssClass: cssClass,
    text: text,
    onClick: () => {
      if (onClick) {
        return onClick();
      }
    },
  };
};
