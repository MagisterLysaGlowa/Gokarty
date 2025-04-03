import { FC } from "react";
import { Header } from "./Header";
import { StaticPageNavbar } from "../StaticPageNavbar/StaticPageNavbar";

type props = {
  title: string;
};

export const PageHeaderWithNavbar: FC<props> = ({ title }) => {
  return (
    <Header className="flex flex-col gap-3 py-2">
      <p className="text-center text-main-default text-4xl">{title}</p>
      <StaticPageNavbar />
    </Header>
  );
};
