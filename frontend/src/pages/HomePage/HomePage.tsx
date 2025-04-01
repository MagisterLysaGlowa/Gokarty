import { Button, Image } from "@heroui/react";
import { FaArrowRight } from "react-icons/fa";
import { staticPageNav } from "../../components/Navbar/navbarUtils";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import { Footer } from "../../components/componentsExport";
import { Separator } from "../../components/StaticPageComponents/Separator";
import { Header } from "../../components/StaticPageComponents/Header";
import { NavigationBox } from "./HomePageComponents/NavigationBox";

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <Header classNames="text-center flex justify-between items-center">
        <Image src="images/gokart.png" height={60} />
        <h1 className="text-[40px] flex items-center gap-2 font-medium">
          <span>Gokarty</span>
          <span className="bg-main-default text-black rounded-xl px-2">
            hub
          </span>
        </h1>
        <span>Zapodaj logowanie</span>
      </Header>
      <div className="grid grid-cols-3 bg-white py-3 border-y-8 border-main-default ">
        <Image src="images/mainPage.jpg" className="rounded-none" />
        <Image src="images/mainPage.jpg" className="rounded-none" />
        <Image src="images/mainPage.jpg" className="rounded-none" />
      </div>
      <div className="flex flex-col justify-evenly flex-1 items-center">
        <h2 className="text-4xl font-bold text-center">Figma bols</h2>
        <label className="text-balance text-[15px] w-2/3 text-center">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi
          ullam tenetur quae delectus cum quisquam modi facere consequatur
          voluptate sed culpa excepturi, expedita dolorum porro dolore earum
          assumenda dicta eius?Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Eligendi ullam tenetur quae delectus cum quisquam
          modi facere consequatur voluptate sed culpa excepturi, expedita
          dolorum porro dolore earum assumenda dicta eius?Lorem ipsum dolor sit
          amet consectetur adipisicing elit. Eligendi ullam tenetur quae
          delectus cum quisquam modi facere consequatur voluptate sed culpa
          excepturi, expedita dolorum porro dolore earum assumenda dicta eius?
        </label>
      </div>
      <div className="menu flex flex-col justify-center items-center gap-7 flex-wrap">
        <Button
          color="warning"
          className="text-white text-2xl h-[50px]"
          size="lg"
          endContent={<FaArrowRight />}
          onPress={() => navigate("/zawody")}
        >
          Przejdź do zawodów
        </Button>
        <div className="navigation flex text-6xl gap-10 h-[100px] justify-center flex-wrap">
          {staticPageNav.map((el, index, list) => (
            <NavigationBox
              element={el}
              key={el.id}
              showDivider={index !== list.length - 1}
            />
          ))}
        </div>
        <div className="w-2/3 text-center mb-5">
          Przed użyciem zapoznaj się z treścią ulotki dołączonej do opakowania
          bądź skonsultuj się z lekarzem lub farmaceutą, gdyż każdy lek
          niewłaściwie stosowany zagraża Twojemu życiu lub zdrowiu.
        </div>
      </div>
      <Separator />
      <Footer />
    </div>
  );
};
export default HomePage;
