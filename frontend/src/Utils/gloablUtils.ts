import { SlotsToClasses } from "@heroui/react";

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
