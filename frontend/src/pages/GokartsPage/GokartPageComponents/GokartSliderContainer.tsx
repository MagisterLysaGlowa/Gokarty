import { Autoplay, Navigation } from "swiper/modules";
import { gokartsArray } from "../GokartPageUtils";
import { Swiper } from "swiper/react";
import { SwiperSlide } from "swiper/react";
import { Image, Divider } from "@heroui/react";
export const GokartSliderContainer = () => {
  return (
    <Swiper
      className="px-3"
      modules={[Autoplay, Navigation]}
      slidesPerView={4} // Widoczne 3 slajdy na raz
      slidesPerGroup={1} // Przesuwa się tylko o 1 slajd na raz
      // centeredSlides={true} // Środkowanie slajdów
      loop={true} // Zapętlenie slajdów
      autoplay={{ delay: 2000, disableOnInteraction: false }} // Po interakcji autoplay wraca
      speed={500} // Płynne przesuwanie
      grabCursor={true} // Możliwość przeciągania myszką
      navigation={true}
    >
      {gokartsArray.map((element, index) => (
        <SwiperSlide key={index} className="flex flex-col gap-10 xl:px-5 lg:px-4 md:px-3 sm:px-2 px-1">
          <Image
            src={element.src}
            alt={`Slide ${index + 1}`}
            className="rounded-none aspect-square object-cover w-full"
          />
          <h3 className="xl:text-4xl lg:text-3xl md:text-xl text-center text-main-default">
            {element.name}
          </h3>
          <Divider className="w-10/12 mx-auto h-2 rounded-lg" />
          <p className="lg:text-lg md:text-md">{element.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
