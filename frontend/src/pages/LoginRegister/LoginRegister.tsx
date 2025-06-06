import { Divider } from "@heroui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/authContext/useAuth";
import { LoginForms } from "./LoginRegisterComponents/LoginForms";
import { RegisterForms } from "./LoginRegisterComponents/RegisterForms";

export const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      if (isLoggedIn && user) navigate("/", { replace: true });
    })();
  }, [isLoggedIn, user, navigate]);

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
