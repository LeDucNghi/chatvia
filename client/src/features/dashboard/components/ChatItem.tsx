import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import CustomModal from "../../../components/common/Modal/Modal";
import { IconButton } from "@mui/material";
import { Loader } from "../../../components/common/Loader/BaseLoader";
import { Message } from "../../../models";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import { useState } from "react";

export interface IChatItemProps {
  userType: "friend" | "me";

  message: Message;

  isDisabled?: boolean;
  isTyping?: boolean;
  hasImages?: boolean;
}

export function ChatItem({
  userType,
  message,
  isDisabled,
  isTyping,
  hasImages,
}: IChatItemProps) {
  // check id nếu thằng sau trùng thằng trước
  // thì thằng tin nhắn trc sẽ bị ẩn tên và avatar

  // const filter = messagesList.filter(cons => cons.id === message.id)

  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");

  const handleOpenImage = (img: string) => {
    setIsOpen(true);
    setImg(img);
  };

  return (
    <>
      {userType === "friend" ? (
        <div className="chat-item-wrapper w-full flex">
          <div className="chat-avatar mr-3">
            {!isDisabled && (
              <img src={`${message.sender.avatar}`} alt="avatar" />
            )}
          </div>

          <div className="chat-content">
            <div className="w-full flex flex-wrap">
              <div className="chat-text-wrap flex mb-3">
                <div className="chat-text-content">
                  {isTyping ? (
                    <p className="chat-text flex items-end">
                      {" "}
                      Typing{" "}
                      <Loader
                        style={{
                          fontSize: "0.2rem",
                          marginLeft: "0.1rem",
                        }}
                      />{" "}
                    </p>
                  ) : (
                    <>
                      <p className="chat-text"> {message.message}</p>
                      {hasImages && (
                        <ul className="flex relative w-full">
                          {message.images?.map((img, key) => {
                            return (
                              <li
                                key={key}
                                onClick={() => handleOpenImage(img.img)}
                                className=" cursor-pointer w-40 h-28 p-1"
                              >
                                <img
                                  src={img.img}
                                  alt=""
                                  className="rounded-2xl z-10 object-contain w-full h-full border border-solid border-white"
                                />
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </>
                  )}

                  {!isTyping && (
                    <p className="chat-time flex items-center justify-end">
                      <AccessAlarmsOutlinedIcon fontSize="small" />
                      10:31
                    </p>
                  )}
                </div>

                {!isTyping && (
                  <div className="chat-text-option">
                    <IconButton>
                      <MoreVertOutlinedIcon />
                    </IconButton>
                  </div>
                )}
              </div>
              <div className="chat-name w-full capitalize font-semibold">
                {!isDisabled && message.sender.username}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="chat-item-wrapper w-full right flex">
          <div className="chat-content">
            <div className="w-full flex flex-wrap">
              <div className="chat-text-wrap flex justify-end mb-3">
                <div className="chat-text-option">
                  <IconButton>
                    <MoreVertOutlinedIcon />
                  </IconButton>
                </div>
                <div className="chat-text-content">
                  <p className="chat-text">{message.message}</p>

                  <p className="chat-time flex items-center justify-end">
                    <AccessAlarmsOutlinedIcon fontSize="small" />
                    10:31
                  </p>
                </div>
              </div>

              {!isDisabled && (
                <div className="chat-name w-full capitalize font-semibold">
                  {message.sender.username}
                </div>
              )}
            </div>
          </div>

          <div className="chat-avatar ml-3">
            {!isDisabled && (
              <img src={`${message.sender.avatar}`} alt="avatar" />
            )}
          </div>
        </div>
      )}
      <CustomModal isOpen={isOpen} onClose={setIsOpen}>
        <img className="rounded-2xl" src={img} alt="" />
      </CustomModal>
    </>
  );
}
