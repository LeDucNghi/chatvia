import * as React from "react";

import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { Images } from "@/constants";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";

export interface IChatItemProps {
  userType: "friend" | "me";
}

export function ChatItem(props: IChatItemProps) {
  return (
    <div className="chat-item-wrapper flex">
      <div className="chat-avatar mr-3">
        <Image src={Images.avatar1} alt="avatar" />
      </div>

      <div className="chat-content">
        <div className="w-full flex flex-wrap">
          <div className="chat-text-wrap flex mb-3">
            <div className="chat-text-content">
              <p className="chat-text">
                please, save this pictures to your file and give it to me after
                you have done with edit!
              </p>

              <p className="chat-time flex items-center justify-end">
                <AccessAlarmsOutlinedIcon fontSize="small" />
                10:31
              </p>
            </div>
            <div className="chat-text-option">
              <IconButton>
                <MoreVertOutlinedIcon />
              </IconButton>
            </div>
          </div>
          <div className="chat-name w-full capitalize font-semibold">
            patrick hendricks
          </div>
        </div>
      </div>
    </div>
  );
}
