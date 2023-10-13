import "./Conversation.scss";

import { ChangeEvent, useState } from "react";
import { IconButton, TextField } from "@mui/material";
import {
  selectConversations,
  selectFetching,
  selectMode,
} from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import { Emoji } from "../../../../models";
import { FileList } from "./FileList";
import { SectionTool } from "./SectionTool";
import { sendMsg } from "../../dashboardThunk";

export interface ISectionProps {
  partnerId: string;
}

export function Section({ partnerId }: ISectionProps) {
  const dispatch = useAppDispatch();
  const conversation = useAppSelector(selectConversations);
  const fetching = useAppSelector(selectFetching);
  const mode = useAppSelector(selectMode);

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
          consId: conversation?._id,
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
    <div
      className={`chat-input-section flex items-center justify-between ${
        mode === "dark" && "dark"
      }`}
    >
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
              <FileList
                files={files}
                openImage={handleOpenImg}
                deleteFile={handleDeleteFile}
              />
            ),
        }}
      />

      <SectionTool
        msg={msg}
        openEmoji={openEmoji}
        setOpenEmoji={setOpenEmoji}
        selectEmoji={handleSelectEmoji}
        selectFile={handleSelectFile}
        sendMsg={handleSendMessage}
      />

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
