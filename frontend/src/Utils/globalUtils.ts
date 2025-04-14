import { SlotsToClasses } from "@heroui/react";
import { TableActionButtonProps } from "../../types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { validateImageFile } from "../validations/ImageFileValidation";
import { HiPlus } from "react-icons/hi";

/* eslint-disable @typescript-eslint/no-explicit-any */
export type DeepKeys<T, Prefix extends string = ""> = {
  [K in keyof T]: T[K] extends object
    ? T[K] extends Array<any>
      ? `${Prefix}${Extract<K, string>}`
      :
          | `${Prefix}${Extract<K, string>}`
          | DeepKeys<T[K], `${Prefix}${Extract<K, string>}.`>
    : `${Prefix}${Extract<K, string>}`;
}[keyof T];

export const handleInputChange =
  <T>(
    seter: React.Dispatch<React.SetStateAction<T>>,
    key: DeepKeys<T>,
    value?: any
  ) =>
  (e: React.ChangeEvent<HTMLInputElement>) => {
    seter((prev) => ({ ...prev, [key]: value || e.target.value }));
  };

export const imagesPath = "http://localhost:5079/images/";

export const fileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>,
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>,
) => {
  const file = e.target.files?.[0];
  if(file && validateImageFile(file)) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
  e.target.value = "";
}

export const basicTableClasses:
  | SlotsToClasses<
      | "base"
      | "table"
      | "tbody"
      | "td"
      | "tfoot"
      | "th"
      | "thead"
      | "tr"
      | "wrapper"
      | "sortIcon"
      | "emptyWrapper"
      | "loadingWrapper"
    >
  | undefined = {
  wrapper: "bg-transparent shadow-none px-0",
};

export const defaultVariant: "flat" | "bordered" | "underlined" | "faded" =
  "bordered";

export const defaultEditButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: FaEdit({}),
  variant: "solid",
  color: "primary",
  isIconOnly: true,
}

export const defaultRemoveButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: FaTrash({}),
  isIconOnly: true,
  variant: "solid",
  className: "bg-red-600"
}

export const defaultAddButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: HiPlus({}),
  isIconOnly: true,
  variant: "solid",
  color: "warning",
}