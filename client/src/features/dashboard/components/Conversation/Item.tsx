import "./Conversation.scss";

import { Message, UserProfile } from "../../../../models";

import CustomModal from "../../../../components/common/Modal/Modal";
import { Left } from "./ItemLeft";
import { Right } from "./ItemRight";
import { selectUser } from "../../../auth/authSlice";
import { useAppSelector } from "../../../../app/store";
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
  console.log("🚀 ~ sender:", sender)
  // check id nếu thằng sau trùng thằng trước
  // thì thằng tin nhắn trc sẽ bị ẩn tên và avatar

  // const filter = messagesList.filter(cons => cons.id === message.id)
  const user = useAppSelector(selectUser);

  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");

  const handleOpenImage = (img: string) => {
    setIsOpen(true);
    setImg(img);
  };

  return (
    <>
      {sender._id !== user?._id ? (
        <Left
          image={handleOpenImage}
          isTyping={isTyping}
          hasImages={hasImages}
          message={message}
          isDisabled={isDisabled}
        />
      ) : (
        <Right
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
