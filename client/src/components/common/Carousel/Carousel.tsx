import "swiper/css";
import "./Carousel.scss";

import { Swiper, SwiperSlide } from "swiper/react";

import { AvatarBadge } from "../Avatar/AvatarBadge";
import { UserProfile } from "../../../models";
import { selectMode } from "../../../features/dashboard/dashboardSlice";
import { useAppSelector } from "../../../app/store";

export interface ICarouselProps {
  option: UserProfile[] | undefined;

  onUserSelected: (id: string) => void;
}

export function Carousel({ option, onUserSelected }: ICarouselProps) {
  const mode = useAppSelector(selectMode);

  const onClick = (id: string) => {
    onUserSelected(id);
  };

  return (
    <Swiper
      spaceBetween={15}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      className="carousel"
    >
      {option?.map((user, key) => {
        return (
          <SwiperSlide key={key} onClick={() => onClick(user._id!)}>
            {" "}
            <div
              className="carousel-item relative rounded-2xl flex-center flex-col px-6"
              style={{ background: mode === "dark" ? "#36404a" : "" }}
            >
              <AvatarBadge status="online" avatar={user.avatar!} />
              <h5
                className={`font-medium pb-2 truncate w-full ${
                  mode === "dark" ? "text-white" : ""
                }`}
              >
                {user.username}{" "}
              </h5>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
