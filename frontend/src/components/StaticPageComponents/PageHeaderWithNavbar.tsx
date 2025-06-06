import { FC } from "react";
import { LoginButton } from "../LoginButton/LoginButton";
import { StaticPageNavbar } from "../StaticPageNavbar/StaticPageNavbar";
import { Header } from "./Header";

type props = {
  title: string;
};

export const PageHeaderWithNavbar: FC<props> = () => {
  return (
    <Header className=" py-2">
      <div className="grid grid-cols-[15%_70%_15%] content-center">
        <div className="mx-auto"></div>
        <div className="lg:text-[40px] sm:text-[35px] xs:text-[30px] text-[25px] flex gap-2 font-medium text-center justify-center">
          <span>Gokarty</span>
          <span className="text-main-default">hub</span>
        </div>
        <label className="justify-center flex">
          <LoginButton />
        </label>
      </div>
      <StaticPageNavbar />
    </Header>
  );
};
