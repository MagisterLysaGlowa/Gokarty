import { Button, Divider, Image, Tooltip } from "@heroui/react";
import { FaArrowRight, FaInfoCircle } from "react-icons/fa";
import { navElements } from "../../components/Navbar/navbarUtils";
import { Link, useNavigate } from "react-router-dom";
import "./HomePage.css";
import React from "react";

const HomePage = () => {
  const navigate = useNavigate();
  const useLess = ["Strona główna", "Zawody"];
  const navigationElements = navElements.filter(
    (z) => !useLess.includes(z.name)
  );

  return (
    <div className="flex flex-col justify-between h-full">
      <div className="w-full text-center flex justify-between items-center p-3">
        <Image src="images/gokart.png" height={60} />
        <h1 className="text-[40px] flex items-center gap-2 font-medium">
          <span>Gokarty</span>
          <span className="bg-main-default text-black rounded-xl px-2">
            hub
          </span>
        </h1>
        <span>Zapodaj logowanie</span>
      </div>
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
          {navigationElements.map((el) => (
            <React.Fragment key={el.id}>
              <Tooltip content={el.name} showArrow>
                <Link to={el.to} className="homeNavigationElement">
                  <el.icon />
                </Link>
              </Tooltip>
              <Divider
                orientation="vertical"
                className="w-[4px] h-[80%] my-auto rounded-3xl"
              />
            </React.Fragment>
          ))}
          <Tooltip content={"Informacje"} showArrow>
            <Link to={"/informacje"} className="homeNavigationElement">
              <FaInfoCircle />
            </Link>
          </Tooltip>
        </div>
        <div className="w-2/3 text-center mb-5">
          Przed użyciem zapoznaj się z treścią ulotki dołączonej do opakowania
          bądź skonsultuj się z lekarzem lub farmaceutą, gdyż każdy lek
          niewłaściwie stosowany zagraża Twojemu życiu lub zdrowiu.
        </div>
      </div>
      <div className="bg-white p-3 border-t-8 border-main-default w-full">
        <p className="text-black font-bold text-center">
          Mechanik OG full gangsta © {new Date().getFullYear()}
        </p>
      </div>
    </div>
  );
};
export default HomePage;
