import { useState } from "react";
import { Footer } from "../../components/componentsExport";
import { Header } from "../../components/StaticPageComponents/Header";
import { Separator } from "../../components/StaticPageComponents/Separator";
import { RegisterForms } from "./LoginRegisterComponents/RegisterForms";
import { LoginForms } from "./LoginRegisterComponents/LoginForms";
import { Divider } from "@heroui/react";
import { UserQuery } from "../../queries/userQuery";

export const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { mutateAsync: logout } = UserQuery.logout();
  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <Header>
        <p className="text-center text-4xl font-bold">
          Ryj <span className="text-main-default">Estracja</span>
        </p>
      </Header>
      <Separator />
      <div className="flex-1 flex justify-center p-3 ">
        <div className="w-1/4 rounded-lg overflow-hidden flex flex-col gap-3 bg-[#202020] p-3">
          <header>
            <h2 className="text-center text-main-default text-2xl">
              {isLogin ? "Logowanie" : "Rejestracja"}
            </h2>
          </header>
          <Divider className="bg-main-default" />
          <div className="flex-1 gap-3 flex flex-col">
            {isLogin ? (
              <LoginForms setIsLogin={setIsLogin} />
            ) : (
              <RegisterForms setIsLogin={setIsLogin} />
            )}
          </div>
          <Divider className="bg-main-default" />
          <footer className="h-[100px] text-center">
            Jakies gówno tu bedzie kiedys
          </footer>
        </div>
      </div>
      <span onClick={async () => await logout()}>Wyloguj</span>
      <Separator />
      <Footer />
    </div>
  );
};
