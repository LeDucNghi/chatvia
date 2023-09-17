import { Avatar, IconButton } from "@mui/material";

import CallIcon from "@mui/icons-material/Call";
import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../components/common/Modal/Modal";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Images } from "../../../constants";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { useState } from "react";

export function ChatHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState({
    isVoice: false,
    isVideo: false,
  });

  const handleOpenModal = (modalType: "isVoice" | "isVideo") => {
    setIsOpen(true);

    if (modalType === "isVoice") {
      setModalType({ isVoice: true, isVideo: false });
    } else {
      setModalType({ isVoice: false, isVideo: true });
    }
  };

  return (
    <div className="chat-header">
      <div className="header-name flex justify-between">
        <img src={Images.avatar1} alt="logo" />

        <h5 className="flex font-semibold items-center">
          doris brown <FiberManualRecordIcon className="icon online ml-1" />
        </h5>
      </div>

      <div className="header-tool flex justify-end">
        <IconButton className="px-4">
          <SearchIcon />
        </IconButton>

        <IconButton onClick={() => handleOpenModal("isVoice")} className="px-4">
          <CallIcon />
        </IconButton>

        <IconButton onClick={() => handleOpenModal("isVideo")} className="px-4">
          <VideocamOutlinedIcon />
        </IconButton>

        <IconButton className="px-4">
          <PersonOutlineOutlinedIcon />
        </IconButton>

        <IconButton className="px-4">
          <MoreHorizOutlinedIcon />
        </IconButton>
      </div>

      <CustomModal
        styles={{ width: "31.25rem", height: "22rem" }}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <div className="modal-wrappe p-6 flex flex-col items-center">
          <div className="avatar w-28 h-28">
            <Avatar
              src={Images.avatar1}
              sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </div>

          <div className="w-full my-8">
            <h5 className="w-full text-lg font-semibold text-center capitalize">
              {" "}
              doris brown{" "}
            </h5>

            <p className="w-full text-sm text-gray-400 text-center capitalize">
              start audio call
            </p>
          </div>

          <div className="w-full flex justify-center">
            <div className="px-2">
              <IconButton
                style={{ color: "#fff", background: "red", padding: "0.9rem" }}
              >
                <ClearIcon />
              </IconButton>
            </div>
            <div className="px-2">
              <IconButton
                style={{
                  color: "#fff",
                  background: "#06d6a0",
                  padding: "0.9rem",
                }}
              >
                {modalType.isVoice ? <LocalPhoneIcon /> : <VideocamIcon />}
              </IconButton>
            </div>
          </div>
        </div>
      </CustomModal>
    </div>
  );
}
