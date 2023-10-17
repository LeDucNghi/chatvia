import "./Conversation.scss";

import { Avatar, Skeleton, Typography } from "@mui/material";
import {
  selectConversations,
  selectFetching,
  selectMode,
  selectPartner,
} from "../../dashboardSlice";

import { Calling } from "./Calling";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { HeaderTool } from "./HeaderTool";
import { useAppSelector } from "../../../../app/store";
import { useState } from "react";

export function Header() {
  const conversations = useAppSelector(selectConversations);
  const fetching = useAppSelector(selectFetching);
  const partner = useAppSelector(selectPartner);
  const mode = useAppSelector(selectMode);

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
    <div
      className={`chat-header w-full px-4 py-6 flex ${
        mode === "dark" && "dark"
      }`}
    >
      {fetching.isConversation ? (
        <div className="flex items-center justify-between">
          <Skeleton variant="circular">
            <Avatar />
          </Skeleton>

          <Skeleton sx={{ ml: "1rem" }} variant="rounded">
            <Typography>
              doris brown <FiberManualRecordIcon className="icon online ml-1" />
            </Typography>
          </Skeleton>
        </div>
      ) : (
        <>
          {conversations.messages?.length !== 0 && (
            <div className="header-name flex justify-between items-center">
              <img
                className="w-9 h-9 object-contain"
                src={partner?.avatar}
                alt="logo"
              />

              <h5 className="flex font-semibold items-center w-4/5 capitalize">
                {partner?.username}
                <FiberManualRecordIcon className="icon online ml-1" />
              </h5>
            </div>
          )}

          <HeaderTool call={handleOpenModal} conversation={conversations} />

          <Calling
            isOpen={isOpen}
            setIsOpen={setIsOpen}
            modalType={modalType}
            partner={partner!}
          />
        </>
      )}
    </div>
  );
}
