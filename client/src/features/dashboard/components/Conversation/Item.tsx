import "./Conversation.scss";

import { Message, UserProfile } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import CustomModal from "../../../../components/common/Modal/Modal";
import { Left } from "./ItemLeft";
import { Right } from "./ItemRight";
import { removeMessage } from "../../dashboardThunk";
import { selectConversationId } from "../../dashboardSlice";
import { selectUser } from "../../../auth/authSlice";
import { useState } from "react";

export interface IChatItemProps {
  sender: UserProfile;

  message: Message;

  isDisabled?: boolean;
  isTyping?: boolean;
  hasImages?: boolean;
}

export function ChatItem({
  sender,
  message,
  isDisabled,
  isTyping,
  hasImages,
}: IChatItemProps) {
  const user = useAppSelector(selectUser);
  const consId = useAppSelector(selectConversationId)
  const dispatch = useAppDispatch()

  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");

  const handleOpenImage = (img: string) => {
    setIsOpen(true);
    setImg(img);
  };

  const handleDeleteChatItem = (value: string, messageId: string) => {
    if (value === "remove") {
      dispatch(removeMessage(messageId, consId))
    }
  }

  return (
    <>
      {sender._id !== user?._id ? (
        <Left
          onClick={handleDeleteChatItem}
          image={handleOpenImage}
          isTyping={isTyping}
          hasImages={hasImages}
          message={message}
          isDisabled={isDisabled}
        />
      ) : (
        <Right
          onClick={handleDeleteChatItem}
          image={handleOpenImage}
          isTyping={isTyping}
          hasImages={hasImages}
          message={message}
          isDisabled={isDisabled}
        />
      )}
      <CustomModal isOpen={isOpen} onClose={setIsOpen}>
        <img className="rounded-2xl" src={img} alt="" />
      </CustomModal>
    </>
  );
}
