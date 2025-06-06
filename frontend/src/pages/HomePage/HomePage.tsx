import { Button, Image } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Footer } from "../../components/componentsExport";
import { LoginButton } from "../../components/LoginButton/LoginButton";
import { staticPageNav } from "../../components/Navbar/navbarUtils";
import { Header } from "../../components/StaticPageComponents/Header";
import { Separator } from "../../components/StaticPageComponents/Separator";
import { useAuth } from "../../contexts/authContext/useAuth";
import { RoleName, UserRoleAccess } from "../../Utils/globalUtils";
import "./HomePage.css";
import { NavigationBox } from "./HomePageComponents/NavigationBox";

const HomePage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <Header className="grid grid-cols-[15%_70%_15%] content-center py-2">
        <div className="mx-auto">
          {/* <Image src="images/gokart.png" className="h-[20px]"/> */}
        </div>
        <div className="lg:text-[40px] sm:text-[35px] xs:text-[30px] text-[25px] flex gap-2 font-medium text-center justify-center">
          <span>Gokarty</span>
          <span className="text-main-default">hub</span>
        </div>
        <label className="justify-center flex">
          {/* <Link to="/logowanie" className="text-center flex align-middle my-auto hover:text-zinc-300">Zapodaj logowanie</Link> */}
          <LoginButton />
        </label>
      </Header>
      <div className="grid grid-cols-3 bg-white xl:p-4 lg:p-3 p-2 xl:border-y-8 lg:border-y-8 md:border-y-7 border-y-4 border-main-default w-full">
        {Array.from({ length: 3 }, () => (
          <Image src="images/mainPage.jpg" className="rounded-none" />
        ))}
      </div>
      <div className="flex flex-col justify-evenly flex-1 items-center">
        <h2 className="lg:text-4xl md:text-3xl sm:text-2xl xs:text-xl text-lg font-bold text-center lg:m-5 md:m-3 m-2">
          Zawody kartingowe
        </h2>
        <div className="text-balance space-y-2 text-center md:w-2/3 md:mx-0 mx-2 lg:text-md md:text-sm text-xs">
          <p>
            ZSTIO limanowa słynie z wysokiego poziomu nauczania zawodowego wielu
            profili technicznych, jednym z nich jest technik pojazdów
            samochodowych. W celu promocji tego profilu, nasza szkoła decyduje
            się na organizację zawodów.
          </p>
          <p>
            Interesują cię gokarty? Myślisz, że to czas aby wygrać puchary?
            Chcesz spróbować swoich sił? Dołącz do nas! Uczestnikami zawodów
            może być każdy uczeń Naszej szkoły, bądź uczeń szkoły
            zaprzyjaźnionej.
          </p>
          <p>
            Zawody kartingowe są idealną okazją aby odnaleźć w sobie ukryty
            talent kierowcy, sprawdzić swoje umiejętności, wzbudzić w sobie
            pasję do motoryzacji lub poprostu się dobrze bawić. Zawody są
            darmowe, odbywają się dla różnych grup wiekowych, aby zachować
            balans umiejętności pomiędzy zawodnikami.
          </p>
          <p>
            Baczne oko sędziów jak zarówno zaangażowanych opiekunów czuwa nad
            bezpieczeństwem i dokładnością przebiegu rywalizacji.
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center gap-7 m-5 flex-wrap">
        <div className="flex-col btnImg navigation flex justify-center space-y-5 w-full lg:w-[40dvw] md:w-[60dvw] sm:w-[80dvw]">
          <div className="justify-center w-full flex">
            <Button
              color="warning"
              className="text-white xl:text-2xl lg:text-lg h-[50px]"
              size="lg"
              endContent={<FaArrowRight className="text-sm" />}
              onPress={() => {
                if (UserRoleAccess.amIAllowed(user, RoleName.management))
                  navigate("/zawody");
                else navigate("/turnieje");
              }}
            >
              Przejdź do zawodów
            </Button>
          </div>

          <div className="flex flex-row justify-center items-center md:gap-[2dvw] gap-[3dvw]">
            {staticPageNav.map((el, index, list) => (
              <NavigationBox
                element={el}
                key={el.id}
                showDivider={index !== list.length - 1}
              />
            ))}
          </div>
        </div>

        <h2 className="text-2xl font-bold text-center">Spróbuj swoich sił!</h2>
        <div className="w-2/3 text-center">
          W celu zapisania się na zawody, skontaktuj się z nami.
        </div>
        <h2 className="text-xl font-bold text-center text-main-default">
          Powodzenia!
        </h2>
      </div>
      <Separator />
      <Footer />
    </div>
  );
};
export default HomePage;
