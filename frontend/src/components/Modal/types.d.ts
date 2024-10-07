export interface MyContextType {
  isOpen: boolean;
  openModal: (options: ModalProps) => void;
  closeModal: () => void;
}
export interface MyProviderProps {
  children: ReactNode;
}
interface ButtonProperties {
  cssClass: string;
  text: string;
  onClick?: () => void;
}
export interface ModalProps {
  title: string;
  content: string;
  buttons?: ButtonProperties[];
}
