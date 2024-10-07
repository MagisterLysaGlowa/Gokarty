import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Modal.css";
import "bootstrap/dist/css/bootstrap.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useModal } from "../useModal";
import { ModalProps } from "../types";
import { ButtonBuilderComponent } from "../ButtonBuilderComponent/ButtonBuilderComponent";
import { useEffect, useRef } from "react";

interface ModalPropsOptions {
  props: ModalProps | null;
}

export const ModalComponent: React.FC<ModalPropsOptions> = ({ props }) => {
  const { isOpen, closeModal } = useModal();
  const container = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isOpen && container.current) {
      setTimeout(() => {
        if (container.current) {
          container.current.classList.add("visible");
        }
      });
    } else if (container.current) {
      container.current.classList.remove("visible");
    }
  }, [isOpen]);

  if (isOpen === false || !props) return null;
  return (
    <div className="modalContainer" ref={container}>
      <div className="modalWindow">
        <div className="header">
          <h3>{props.title}</h3>
          <button
            onClick={() => {
              closeModal();
            }}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </div>
        <div className="content">{props.content}</div>
        <div className="button">
          <ButtonBuilderComponent props={props.buttons} />
        </div>
      </div>
    </div>
  );
};
