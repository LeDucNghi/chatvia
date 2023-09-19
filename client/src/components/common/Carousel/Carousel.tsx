import "swiper/css";
import "./Carousel.scss";

import { Swiper, SwiperSlide } from "swiper/react";

import { AvatarBadge } from "../Avatar/AvatarBadge";
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
      // onSwiper={(swiper) => console.log(swiper)}
      className="carousel"
    >
      {option.map((user, key) => {
        return (
          <SwiperSlide key={key}>
            {" "}
            <div className="carousel-item">
              <AvatarBadge status="online" avatar={user.avatar!} />
              <h5 className="font-medium pb-2">{user.username} </h5>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
