import "swiper/css";
import "./Carousel.scss";

import { AvatarBadge } from "../Avatar/AvatarBadge";
import { UserProfile } from "../../../models";

export interface ICarouselItemProps {
  user: UserProfile;
}

export function CarouselItem({ user }: ICarouselItemProps) {
  return (
    <div className="carousel-item">
      <AvatarBadge status="online" avatar={user.avatar!} />
      <h5 className="font-medium pb-2">{user.username} </h5>
    </div>
  );
}
