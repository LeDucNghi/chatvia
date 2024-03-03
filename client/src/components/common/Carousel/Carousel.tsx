import "swiper/css";
import "./Carousel.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  fetchGroupInformationSuccess,
  onOpenConversation,
  onSelectedConversation,
  selectMode,
} from "../../../features/dashboard/dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { AvatarBadge } from "../Avatar/AvatarBadge";
import { CarouselItemLoader } from "../Loader/CarouselLoader";
import { Conversation } from "../../../models";
import { Images } from "../../../constants";
import { selectUser } from "../../../features/auth/authSlice";

export interface ICarouselProps {
  option: Conversation[] | undefined;

  isFetching?: boolean;
}

export function Carousel({ option, isFetching }: ICarouselProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const me = useAppSelector(selectUser)

  const onClick = (id: string) => {
    dispatch(onSelectedConversation(id));
    dispatch(onOpenConversation(true));
    dispatch(fetchGroupInformationSuccess(null));
  };

  return (
    <Swiper
      spaceBetween={10}
      slidesPerView={3}
      onSlideChange={() => console.log("slide change")}
      // onSwiper={(swiper) => console.log(swiper)}
      className="carousel"
    >
      {option?.map((conversation, key) => {
        const friend = conversation.participant.find((user) => user._id !== me?._id)
        return (
          <SwiperSlide key={key} onClick={() => onClick(conversation._id)}>
            {isFetching ? (
              <CarouselItemLoader isFetching={isFetching} />
            ) : (
              <div
                className={`carousel-item relative rounded-2xl flex-center p-2 flex-col w-[80px] h-[60px] `}
                style={{ background: mode === "dark" ? "#36404a" : "" }}
              >
                <AvatarBadge status="online" avatar={friend!.avatar ? friend?.avatar : Images.user} />
                <h5
                  className={`font-medium text-sm truncate w-full ${mode === "dark" ? "text-white" : ""
                    }`}
                >
                  {friend?.username}{" "}
                </h5>
              </div>
            )}{" "}
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
