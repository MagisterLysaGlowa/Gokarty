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
