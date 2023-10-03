import * as React from "react";

import { Button } from "@mui/material";
import { Images } from "../../../constants";
import { useNavigate } from "react-router-dom";

export interface INotFoundProps {
  style?: React.CSSProperties;
  iconStyle?: React.CSSProperties;

  title?: string;
  subTitle?: string;
  buttonContent?: string;
  route?: string;
  className?: string;
  icon?: string;

  hasButton?: boolean;
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
  iconStyle,
}: INotFoundProps) {
  const navigate = useNavigate();

  return (
    <div
      className={`w-full h-full relative flex flex-col justify-center items-center ${className}`}
      style={style}
    >
      <div className="w-20 h-20" style={iconStyle}>
        <img
          src={icon ? icon : Images.error}
          alt="empty"
          className="w-full h-full object-contain pointer-events-none"
        />
      </div>

      <div className="flex flex-col items-center">
        <div className="my-4 flex flex-col justify-center items-center">
          <h3 className="font-semibold text-2xl text-center">
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
