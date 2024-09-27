import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
  closeButton: true,
  theme: "dark",
  pauseOnHover: false,
  closeOnClick: true,
};

interface promiseToastStatesText {
  pending: string;
  success: string;
  error: string;
}

export const successToast = (text: string) => toast.success(text, options);
export const errorToast = (text: string) => toast.error(text, options);
export const infoToast = (text: string) => toast.info(text, options);
export const promiseToast = async <T>(
  promiese: Promise<T>,
  texts: promiseToastStatesText
) => await toast.promise(promiese, texts, options);
