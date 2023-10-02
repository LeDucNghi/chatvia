import "./Conversation.scss";

import { ChangeEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import { selectConversations, selectFetching } from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import AttachFileOutlinedIcon from "@mui/icons-material/AttachFileOutlined";
import BrokenImageOutlinedIcon from "@mui/icons-material/BrokenImageOutlined";
import ClearIcon from "@mui/icons-material/Clear";
import CloseIcon from "@mui/icons-material/Close";
import CustomModal from "../../../../components/common/Modal/Modal";
import { Emoji } from "../../../../models";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import Picker from "@emoji-mart/react";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import data from "@emoji-mart/data";
import { sendMsg } from "../../dashboardThunk";
import { styled } from "@mui/material/styles";

export interface ISectionProps {
  partnerId: string;
}

export function Section({ partnerId }: ISectionProps) {
  const dispatch = useAppDispatch();
  const conversation = useAppSelector(selectConversations);
  const fetching = useAppSelector(selectFetching);

  const [msg, setMsg] = useState<string>("");
  const [openEmoji, setOpenEmoji] = useState<boolean>(false);
  const [files, setFiles] = useState<File[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [img, setImg] = useState("");

  let [emojies, setEmojies] = useState<string[]>([]);

  const handleSendMessage = () => {
    if (msg) {
      dispatch(
        sendMsg({
          consId: conversation?.data._id,
          partnerId: partnerId,
          message: msg,
        })
      );
      setMsg("");
    }
  };

  const handleSelectEmoji = (value: Emoji) => {
    emojies = [...emojies, value.native];

    setEmojies(emojies);

    setMsg(emojies.join(""));

    console.log("🚀 ~ file: Section.tsx:62 ~ handleSelectEmoji ~ Msg:", msg);
    setOpenEmoji(false);
  };

  const handleMsgChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMsg(e.target.value);

    setEmojies(e.target.value.split(" "));
  };

  const handleSelectFile = (event: ChangeEvent<HTMLInputElement>) => {
    if (event) {
      const newFile = event.target.files![0];

      setFiles([...files, newFile]);
    }
  };

  const handleOpenImg = (value: File) => {
    setIsOpen(!isOpen);

    setImg(URL.createObjectURL(value));
  };

  const handleDeleteFile = (item: File) => {
    const file = files.find((val) => val.name === item.name);

    const newFiles = files.filter((val) => val.name !== file?.name);

    setFiles(newFiles);
  };

  return (
    <div className="chat-input-section flex items-center justify-between">
      <TextField
        id="outlined-basic"
        type="text"
        variant="outlined"
        label="Enter Message"
        placeholder="Your Message..."
        className="textfield"
        autoComplete="off"
        value={msg}
        disabled={fetching.isConversation ? true : false}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          handleMsgChange(e)
        }
        sx={{
          ".MuiOutlinedInput-root": {
            paddingTop: files.length !== 0 ? "1rem" : 0,
            flexDirection: "column",
            alignItems: "flex-start",
          },
        }}
        InputProps={{
          startAdornment:
            files.length === 0 ? null : (
              <div className="flex w-full overflow-x-auto">
                {files.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="relative mr-4 w-20 h-20 flex justify-center items-center border-4 border-current rounded-lg"
                    >
                      <div className="absolute z-10 right-0 top-0">
                        <IconButton
                          sx={{
                            background: "#fff",
                            width: "1.2rem",
                            height: "1.2rem",
                            ":hover": {
                              background: "#fff",
                            },
                          }}
                          onClick={() => handleDeleteFile(item)}
                        >
                          <CloseIcon
                            fontSize="small"
                            sx={{
                              width: "1rem",
                              height: "1rem",
                              color: "#000",
                            }}
                          />
                        </IconButton>
                      </div>
                      <div
                        onClick={() => handleOpenImg(item)}
                        className="w-full h-full cursor-pointer"
                      >
                        <img
                          src={URL.createObjectURL(item)}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            ),
        }}
      />

      <div className="chat-input-tool relative flex justify-end">
        <div className="tool-icon p-2 relative">
          <IconButton onClick={() => setOpenEmoji(!openEmoji)}>
            <EmojiEmotionsOutlinedIcon />
          </IconButton>
          <div
            className={
              openEmoji ? `block absolute bottom-16 right-4` : `hidden`
            }
          >
            <Picker data={data} onEmojiSelect={handleSelectEmoji} />
          </div>
        </div>

        <div className="tool-icon p-2 relative">
          <IconButton component="label">
            <VisuallyHiddenInput
              type="file"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleSelectFile(event)
              }
              multiple
            />
            <AttachFileOutlinedIcon />
          </IconButton>
        </div>

        <div className="tool-icon p-2 relative">
          <IconButton component="label">
            <VisuallyHiddenInput
              type="file"
              accept="image/*"
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                handleSelectFile(event)
              }
              multiple
            />
            <BrokenImageOutlinedIcon />
          </IconButton>
        </div>

        <div
          className={
            fetching.isConversation || !msg
              ? "tool-icon p-2 relative send-icon cursor-not-allowed bg-slate-500"
              : "tool-icon p-2 relative send-icon"
          }
        >
          <IconButton
            component="label"
            disabled={fetching.isConversation || !msg ? true : false}
            onClick={() => handleSendMessage()}
          >
            <SendOutlinedIcon />
          </IconButton>
        </div>
      </div>

      <CustomModal
        styles={{ backgroundColor: "none", boxShadow: "none" }}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <div className="w-[800px] h-[550px] relative">
          <img
            className="rounded-2xl w-full h-full object-contain"
            src={img}
            alt=""
          />

          <IconButton
            sx={{
              position: "absolute",
              top: 0,
              right: 0,
              color: "#000",
              bgcolor: "#fff",
              ":hover": {
                bgcolor: "#fff",
              },
            }}
            onClick={() => setIsOpen(!isOpen)}
          >
            <ClearIcon />
          </IconButton>
        </div>
      </CustomModal>
    </div>
  );
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
