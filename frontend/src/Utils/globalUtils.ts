import { SlotsToClasses } from "@heroui/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { HiPlus } from "react-icons/hi";
import { Roles, TableActionButtonProps, User } from "../../types";
import { validateImageFile } from "../validations/ImageFileValidation";

export const imagesPath = "http://localhost:5079/images/";

export const fileChange = (
  e: React.ChangeEvent<HTMLInputElement>,
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>,
  setPreview: React.Dispatch<React.SetStateAction<string | undefined>>
) => {
  const file = e.target.files?.[0];
  if (file && validateImageFile(file)) {
    setImage(file);
    setPreview(URL.createObjectURL(file));
  }
  e.target.value = "";
};

export type TableClasses =
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
  | undefined;

export const defaultVariant: "flat" | "bordered" | "underlined" | "faded" =
  "bordered";

export const defaultEditButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: FaEdit({}),
  variant: "solid",
  color: "primary",
  isIconOnly: true,
};

export const defaultRemoveButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: FaTrash({}),
  isIconOnly: true,
  variant: "solid",
  className: "bg-red-600",
};

export const defaultAddButtonProps: TableActionButtonProps = {
  size: "sm",
  endContent: HiPlus({}),
  isIconOnly: true,
  variant: "solid",
  color: "warning",
};

export enum RoleName {
  management = "management",
  player = "player",
  logedIn = "logedIn",
}

export class UserRoleAccess {
  public static pathWithRoles = new Map<RoleName, Roles[]>([
    [RoleName.management, ["Admin", "Operator"]],
    [RoleName.player, ["Player"]],
    [RoleName.logedIn, ["Admin", "Operator", "Player"]],
  ]);

  public static getRoles(roles: RoleName) {
    return this.pathWithRoles.get(roles) ?? [];
  }

  public static amIAllowed = (user: User | undefined, roles: RoleName) => {
    return user?.roles.some((z) =>
      this.getRoles(roles).includes(z.name as Roles)
    );
  };
}
