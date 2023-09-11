import * as React from "react";

import CallIcon from "@mui/icons-material/Call";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { IconButton } from "@mui/material";
import Image from "next/image";
import { Images } from "@/constants";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

export interface IChatHeaderProps {}

export function ChatHeader(props: IChatHeaderProps) {
  return (
    <div className="chat-header">
      <div className="header-name flex justify-between">
        <Image src={Images.avatar1} alt="logo" />

        <h5 className="flex font-semibold items-center">
          doris brown <FiberManualRecordIcon className="icon online ml-1" />
        </h5>
      </div>

      <div className="header-tool flex justify-end">
        <IconButton className="px-4">
          <SearchIcon />
        </IconButton>

        <IconButton className="px-4">
          <CallIcon />
        </IconButton>

        <IconButton className="px-4">
          <VideocamOutlinedIcon />
        </IconButton>

        <IconButton className="px-4">
          <PersonOutlineOutlinedIcon />
        </IconButton>

        <IconButton className="px-4">
          <MoreHorizOutlinedIcon />
        </IconButton>
      </div>
    </div>
  );
}
