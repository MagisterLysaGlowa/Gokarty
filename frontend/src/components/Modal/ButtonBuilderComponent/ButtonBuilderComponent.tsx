import React from "react";
import { ButtonProperties } from "../types";
import { useModal } from "../useModal";

interface ButtonProps {
  props: ButtonProperties[] | undefined;
}

export const ButtonBuilderComponent: React.FC<ButtonProps> = ({ props }) => {
  const { closeModal } = useModal();
  return props?.map((button) => (
    <button
      key={button.text}
      className={button.cssClass ?? ""}
      onClick={() => {
        if (button.onClick) button.onClick();
        closeModal();
      }}
    >
      {button.text}
    </button>
  ));
};
