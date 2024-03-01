import "./Conversation.scss";

import { Images, messageOptions } from "../../../../constants";

import AccessAlarmsOutlinedIcon from "@mui/icons-material/AccessAlarmsOutlined";
import { Button } from "@mui/material";
import { CustomMenu } from "../../../../components/common/Menu/Menu";
import { Loader } from "../../../../components/common/Loader/BaseLoader";
import { Message } from "../../../../models";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import moment from "moment";
import { selectMode } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export interface ILeftProps {
  message: Message;

  isDisabled?: boolean;
  isTyping?: boolean;
  hasImages?: boolean;

  image: (value: string) => void;
  onClick: (value: string, id: string) => void
}

export function Left({
  message,
  isDisabled,
  isTyping,
  hasImages,
  image,
  onClick
}: ILeftProps) {
  const mode = useAppSelector(selectMode);

  const handleOpenImage = (img: string) => {
    image(img);
  };

  const onMenuChange = (value: string, id: string) => {
    onClick(value, id)
  }

  return (
    <div className="chat-item-wrapper relative w-full flex items-end py-4">
      <div className="chat-avatar mr-3">
        {!isDisabled && <img src={`${message!.sender!.avatar ? message.sender?.avatar : Images.user}`} alt="avatar" />}
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
                  {moment(message.timeStamp).format("LT")}
                </p>
              )}
            </div>

            {!isTyping && (
              <Button className="chat-text-option">
                <CustomMenu
                  onChange={(value: string) => onMenuChange(value, message!._id!)}
                  menu={messageOptions}
                  direction="rtl"
                  icon={<MoreVertOutlinedIcon />}
                />
              </Button>
            )}
          </div>
          <div
            className={`chat-name w-full capitalize font-semibold ${mode === "dark" ? "text-white" : "text-black"
              }`}
          >
            {!isDisabled && message.sender?.username}
          </div>
        </div>
      </div>
    </div>
  );
}
