import React, { createContext, useCallback, useState } from "react";
import { ModalComponent } from "./ModalComponent/ModalComponent";
import { ModalProps, MyContextType, MyProviderProps } from "./types";

export const ModalContext = createContext<MyContextType | undefined>(undefined);

export const ModalProvider: React.FC<MyProviderProps> = ({ children }) => {
  const [isOpen, SetIsOpen] = useState(false);
  const [props, SetProps] = useState<ModalProps | null>({
    title: "Title",
    content: "Content",
  });

  const openModal = useCallback((options: ModalProps) => {
    SetIsOpen(true);
    SetProps(options);
  }, []);
  const closeModal = useCallback(() => {
    SetIsOpen(false);
    SetProps(null);
  }, []);

  return (
    <ModalContext.Provider value={{ isOpen, closeModal, openModal }}>
      {children}
      <ModalComponent props={props} />
    </ModalContext.Provider>
  );
};
