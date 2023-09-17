import "swiper/css";
import "./Carousel.scss";

import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import { UserProfile } from "../../../models";
import { styled } from "@mui/material/styles";

export interface ICarouselItemProps {
  user: UserProfile;
}

export function CarouselItem({ user }: ICarouselItemProps) {
  return (
    <div className="carousel-item">
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" src={user.avatar} />
      </StyledBadge>
      <h5 className="font-medium pb-2">{user.username} </h5>
    </div>
  );
}
const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));
