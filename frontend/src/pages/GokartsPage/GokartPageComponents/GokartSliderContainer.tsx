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
      spaceBetween={100}
      slidesPerView={4} // Widoczne 3 slajdy na raz
      slidesPerGroup={1} // Przesuwa się tylko o 1 slajd na raz
      // centeredSlides={true} // Środkowanie slajdów
      loop={true} // Zapętlenie slajdów
      autoplay={{ delay: 2000, disableOnInteraction: false }} // Po interakcji autoplay wraca
      speed={1000} // Płynne przesuwanie
      grabCursor={true} // Możliwość przeciągania myszką
      navigation={true}
    >
      {gokartsArray.map((element, index) => (
        <SwiperSlide key={index} className="flex flex-col gap-7">
          <Image
            src={element.src}
            alt={`Slide ${index + 1}`}
            className="rounded-none aspect-square object-cover w-full"
          />
          <h3 className="text-4xl text-center text-main-default">
            {element.name}
          </h3>
          <Divider className="w-10/12 mx-auto h-2 rounded-lg" />
          <p>{element.description}</p>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
