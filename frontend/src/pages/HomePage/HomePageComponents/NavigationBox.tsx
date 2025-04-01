import { Tooltip, Divider } from "@heroui/react";
import React from "react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { NavbarListElementSchema } from "../../../components/Navbar/navbarUtils";

type NavigationBoxProps = {
  element: NavbarListElementSchema;
  showDivider: boolean;
};
export const NavigationBox: FC<NavigationBoxProps> = ({
  element,
  showDivider = true,
}) => {
  return (
    <React.Fragment key={element.id}>
      <Tooltip content={element.name} showArrow>
        <Link to={element.to} className="homeNavigationElement">
          <element.icon />
        </Link>
      </Tooltip>
      {showDivider && (
        <Divider
          orientation="vertical"
          className="w-[4px] h-[80%] my-auto rounded-3xl"
        />
      )}
    </React.Fragment>
  );
};
