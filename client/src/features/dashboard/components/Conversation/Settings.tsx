import { Button, Divider, IconButton } from "@mui/material";
import { selectConversations, selectGroupInfo } from "../../dashboardSlice";

import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Images } from "../../../../constants";
import LogoutIcon from "@mui/icons-material/Logout";
import NotificationsOffIcon from "@mui/icons-material/NotificationsOff";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import { SettingsModal } from "./SettingsModal";
import { friendRequests } from "../../../../mock";
import { useAppSelector } from "../../../../app/store";
import { useState } from "react";

// export interface ISettingsProps {
//   group: Group;
// }

export function Settings() {
  const groupInfo = useAppSelector(selectGroupInfo);
  const conversation = useAppSelector(selectConversations);

  const [isOpen, setIsOpen] = useState(false);
  const [modalType, setModalType] = useState<"addUser" | "members" | "images">(
    "addUser"
  );

  const openModal = (open: boolean, type: "addUser" | "members" | "images") => {
    setIsOpen(open);
    setModalType(type);
  };

  return (
    <div>
      <div className="flex justify-center items-center flex-col p-4">
        <div className="w-24 h-24 mb-4">
          <img
            className="w-full h-full object-contain rounded-full"
            src={groupInfo?.avatar ? groupInfo.avatar : Images.avatar1}
            alt=""
          />
        </div>

        <h2 className="font-semibold mb-4"> {groupInfo?.name} </h2>

        <div className="flex w-full justify-between px-10">
          <div className="capitalize flex flex-col font-semibold items-center">
            <IconButton onClick={() => openModal(true, "addUser")}>
              <PersonAddIcon />
            </IconButton>
            add
          </div>

          <div className="capitalize flex flex-col font-semibold items-center">
            <IconButton>
              <NotificationsOffIcon />
            </IconButton>
            mute
          </div>
        </div>
      </div>

      <Divider />

      {/* GROUP MEMBERS */}
      <div className="flex items-center justify-between p-4">
        <div className="w-6 h-6">
          <img
            className="w-full h-full object-cover rounded-full"
            src={groupInfo?.avatar ? groupInfo.avatar : Images.avatar1}
            alt=""
          />
        </div>

        <div className="flex flex-col text-sm">
          <h2 className="w-full font-semibold">
            {groupInfo?.members.length} chat members{" "}
          </h2>
          <div className="w-40 flex flex-row truncate">
            {conversation?.participant.map((user, key) => {
              return <p key={key}> {user.username}, &nbsp; </p>;
            })}
          </div>
        </div>

        <div className="" onClick={() => openModal(true, "members")}>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
        </div>
      </div>

      <Divider />

      {/* MEDIA, FILES, LINKS */}
      <div className="p-4">
        <div className="flex justify-between w-full mb-2">
          <h3 className="capitalize">media, files & links</h3>

          <button
            className="text-blue-400 capitalize"
            onClick={() => openModal(true, "images")}
          >
            see all
          </button>
        </div>

        <div className="flex justify-between">
          {friendRequests.slice(0, 3).map((user, key) => {
            return (
              <div key={key} className="w-20 h-20 ">
                <img
                  className="w-full h-full object-contain rounded-xl"
                  src={user.avatar}
                  alt={user.username}
                />
              </div>
            );
          })}
        </div>
      </div>

      <Divider />

      {/* BUTTON */}
      <div className="w-full flex justify-center p-4">
        <Button className="w-full" color="error" variant="text">
          <div className="w-full h-full flex justify-start capitalize">
            <LogoutIcon className="mr-2" />
            Leave Chat
          </div>
        </Button>
      </div>

      <SettingsModal setOpen={setIsOpen} open={isOpen} type={modalType} />
    </div>
  );
}
