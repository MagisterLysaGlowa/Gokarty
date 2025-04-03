import { Footer } from "../../components/componentsExport";
import { Separator } from "../../components/StaticPageComponents/Separator";
import "swiper/css";
import "swiper/css/navigation";
import { GokartSliderContainer } from "./GokartPageComponents/GokartSliderContainer";
import { PageHeaderWithNavbar } from "../../components/StaticPageComponents/PageHeaderWithNavbar";

export const GokartsPage = () => {
  return (
    <div className="h-full w-full flex flex-col overflow-auto">
      <PageHeaderWithNavbar title="Gokarty" />
      <Separator />
      <GokartSliderContainer />
      <Separator />
      <Footer />
    </div>
  );
};
