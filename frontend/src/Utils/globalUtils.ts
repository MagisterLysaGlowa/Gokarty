import { SlotsToClasses } from "@heroui/react";
import { TableActionButtonProps } from "../../types";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CgAdd } from "react-icons/cg";

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

export const convertDateToInputValue = (date: Date) =>
  date.toISOString().split("T")[0];

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
  variant: "shadow",
  color: "primary",
  isIconOnly: true,
}

export const defaultRemoveButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: FaTrash({}),
  isIconOnly: true,
  variant: "shadow",
  className: "bg-red-600"
}

export const defaultAddButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: CgAdd({}),
  isIconOnly: true,
  variant: "shadow",
  color: "primary",
}