import CallIcon from "@mui/icons-material/Call";
import { IconButton } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";

export interface IHeaderToolProps {
  call: (value: "isVoice" | "isVideo") => void;
}

export function HeaderTool({ call }: IHeaderToolProps) {
  return (
    <div className="header-tool flex justify-end">
      <IconButton className="px-4">
        <SearchIcon />
      </IconButton>

      <IconButton onClick={() => call("isVoice")} className="px-4">
        <CallIcon />
      </IconButton>

      <IconButton onClick={() => call("isVideo")} className="px-4">
        <VideocamOutlinedIcon />
      </IconButton>

      <IconButton className="px-4">
        <PersonOutlineOutlinedIcon />
      </IconButton>

      <IconButton className="px-4">
        <MoreHorizOutlinedIcon />
      </IconButton>
    </div>
  );
}
