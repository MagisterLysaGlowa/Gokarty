import { useState } from "react";
import { RegisterForms } from "./LoginRegisterComponents/RegisterForms";
import { LoginForms } from "./LoginRegisterComponents/LoginForms";
import { Divider } from "@heroui/react";
import { Link } from "react-router-dom";

export const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return (
    <div className="bg-[url(images/mainPage.jpg)] h-full">
      <div className="flex-1 flex justify-center h-full backdrop-blur-md backdrop-brightness-50 ">
        <div className="sm:w-[75%] max-w-[400px] w-full my-auto rounded-lg p-5 overflow-hidden flex flex-col gap-3 bg-[#202020]">
          <header>
            <h2 className="text-center text-main-default text-2xl">
              {isLogin ? "Logowanie" : "Rejestracja"}
            </h2>
          </header>
          <Divider className="bg-main-default" />
          <div className="flex-1 my-3 gap-3 flex flex-col">
            {isLogin ? (
              <LoginForms setIsLogin={setIsLogin} />
            ) : (
              <RegisterForms setIsLogin={setIsLogin} />
            )}
          </div>
          <Divider className="bg-main-default" />
          <footer className="">
            <p className="text-center"> Jakis bardzo długi tekst</p>
            <Link to="/" className="hover:cursor-pointer text-main-default">
              &lt; Powrót do strony głównej
            </Link>
          </footer>
        </div>
      </div>
    </div>
  );
};
