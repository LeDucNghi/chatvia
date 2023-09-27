import { Avatar, IconButton } from "@mui/material";
import { selectConversations, selectPartner } from "../dashboardSlice";

import CallIcon from "@mui/icons-material/Call";
import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../components/common/Modal/Modal";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import VideocamIcon from "@mui/icons-material/Videocam";
import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import { useAppSelector } from "../../../app/store";
import { useState } from "react";

export function ChatHeader() {
  const conversations = useAppSelector(selectConversations);
  // const fetching = useAppSelector(selectFetching);
  const partner = useAppSelector(selectPartner);

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
      {
        // fetching.isConversation ? (
        //   <div className="flex items-center justify-between">
        //     <Skeleton variant="circular">
        //       <Avatar />
        //     </Skeleton>

        //     <Skeleton sx={{ ml: "1rem" }} variant="rounded">
        //       <Typography>
        //         doris brown <FiberManualRecordIcon className="icon online ml-1" />
        //       </Typography>
        //     </Skeleton>
        //   </div>
        // ) :
        conversations &&
        conversations.data &&
        conversations.data.messages.length === 0 ? (
          <div></div>
        ) : (
          <>
            <div className="header-name flex justify-between">
              <img src={partner?.avatar} alt="logo" />

              <h5 className="flex font-semibold items-center">
                {partner?.username}
                <FiberManualRecordIcon className="icon online ml-1" />
              </h5>
            </div>

            <div className="header-tool flex justify-end">
              <IconButton className="px-4">
                <SearchIcon />
              </IconButton>

              <IconButton
                onClick={() => handleOpenModal("isVoice")}
                className="px-4"
              >
                <CallIcon />
              </IconButton>

              <IconButton
                onClick={() => handleOpenModal("isVideo")}
                className="px-4"
              >
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
                    src={partner?.avatar}
                    sx={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                </div>

                <div className="w-full my-8">
                  <h5 className="w-full text-lg font-semibold text-center capitalize">
                    {" "}
                    {partner?.username}
                  </h5>

                  <p className="w-full text-sm text-gray-400 text-center capitalize">
                    start audio call
                  </p>
                </div>

                <div className="w-full flex justify-center">
                  <div className="px-2">
                    <IconButton
                      style={{
                        color: "#fff",
                        background: "red",
                        padding: "0.9rem",
                      }}
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
                      {modalType.isVoice ? (
                        <LocalPhoneIcon />
                      ) : (
                        <VideocamIcon />
                      )}
                    </IconButton>
                  </div>
                </div>
              </div>
            </CustomModal>
          </>
        )
      }
    </div>
  );
}
