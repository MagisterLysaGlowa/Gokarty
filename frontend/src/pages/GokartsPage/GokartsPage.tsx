import { Footer } from "../../components/componentsExport";
import { Header } from "../../components/StaticPageComponents/Header";
import { Separator } from "../../components/StaticPageComponents/Separator";
import "swiper/css";
import "swiper/css/navigation";
import { GokartSliderContainer } from "./GokartPageComponents/GokartSliderContainer";

export const GokartsPage = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <Header>
        <p className="text-center text-main-default text-4xl">Gokarty</p>
      </Header>
      <Separator />
      <div className="flex-1 ">
        <div className="h-full w-full max-h-full flex items-center">
          <GokartSliderContainer />
        </div>
      </div>
      <Separator />
      <Footer />
    </div>
  );
};
