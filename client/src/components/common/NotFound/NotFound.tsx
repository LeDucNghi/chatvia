import * as React from "react";

import { Button } from "@mui/material";
import { Images } from "../../../constants";
import { useNavigate } from "react-router-dom";

export interface INotFoundProps {
  style?: React.CSSProperties;

  title?: string;
  subTitle?: string;
  buttonContent?: string;
  route?: string;
  className?: string;

  hasButton?: boolean;

  icon?: string;
}

export default function NotFound({
  style,
  title,
  subTitle,
  buttonContent,
  route,
  hasButton,
  className,
  icon,
}: INotFoundProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-full relative flex flex-col justify-center items-center ${className}`}
      style={style}
    >
      <img
        // src={type === "component" ? Images.mailbox : Images.error}
        src={icon ? icon : Images.error}
        alt="empty"
        className="w-20 h-20 object-contain pointer-events-none"
      />

      <div className="flex flex-col items-center">
        <div className="my-4 flex flex-col items-center">
          <h3 className="font-semibold text-2xl">
            {title ? title : "Oops... Look like you get lost 🤔"}{" "}
          </h3>
          {subTitle && <h5>{subTitle} </h5>}
        </div>

        {hasButton && (
          <Button variant="outlined" onClick={() => navigate(route!)}>
            <div className="w-full h-full text-black font-semibold">
              {buttonContent ? buttonContent : "Back to Home"}{" "}
            </div>
          </Button>
        )}
      </div>
    </div>
  );
}
