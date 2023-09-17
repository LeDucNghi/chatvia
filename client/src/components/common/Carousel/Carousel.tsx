import "swiper/css";

import { Swiper, SwiperSlide } from "swiper/react";

import { CarouselItem } from "./CarouselItem";
import { UserProfile } from "../../../models";

export interface ICarouselProps {
  option: UserProfile[];
}

export function Carousel({ option }: ICarouselProps) {
  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={4}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
      className="carousel"
    >
      {option.map((user, key) => {
        return (
          <SwiperSlide key={key}>
            {" "}
            <CarouselItem user={user} />{" "}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
