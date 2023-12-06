import * as React from "react";

import { AddUser } from "./AddUser";
import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import { IconButton } from "@mui/material";
import { ImageList } from "./ImageList";
import { Member } from "./Member";
import { UserProfile } from "../../../../models";
import { selectGroupInfo } from "../../dashboardSlice";
import { selectUser } from "../../../auth/authSlice";
import { useAppSelector } from "../../../../app/store";

export interface ISettingsModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;

  type: "addUser" | "members" | "imagesList" | "image";

  image?: string;
}

export function SettingsModal({
  open,
  setOpen,
  type,
  image,
}: ISettingsModalProps) {
  const groupInfo = useAppSelector(selectGroupInfo);
  const user = useAppSelector(selectUser);

  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [members, setMembers] = React.useState<UserProfile[]>([]);

  React.useEffect(() => {
    groupInfo?.members?.forEach((item) => {
      const { member } = item;

      const newMember = user?.friends?.filter((friend) => {
        return friend._id === member;
      });

      setMembers(newMember!);
    });
  }, [groupInfo, user]);

  const findFriend = (e: React.ChangeEvent<HTMLInputElement>) => {
    const friend = user?.friends?.filter((friend) =>
      friend.username?.includes(e.target.value)
    );

    setUsers(friend!);
  };

  const selectFriend = (friend: UserProfile) => {
    const findFriend = users?.filter((item) => item._id === friend._id);

    if (findFriend?.length !== 0) {
      const deleteFriend = users?.filter((item) => item._id !== friend._id);

      setUsers(deleteFriend);
    } else {
      const newFriend = [...users, friend];

      setUsers(newFriend);
    }
  };

  return (
    <>
      <CustomModal
        styles={{ width: "500px", position: "relative" }}
        isOpen={open}
        onClose={() => setOpen(!open)}
      >
        <h2 className="w-full text-center p-4 text-white">
          {type === "imagesList"
            ? "Media, Files & Links"
            : type === "members"
            ? `${groupInfo?.members.length} members`
            : type === "image"
            ? "Images"
            : "Add user"}
        </h2>

        <IconButton
          sx={{ position: "absolute", top: "0.5rem", right: "1rem" }}
          onClick={() => setOpen(!open)}
        >
          <ClearIcon />
        </IconButton>

        {type === "members" ? (
          <Member />
        ) : type === "imagesList" ? (
          <ImageList />
        ) : type === "image" ? (
          <div className="w-[500px] h-[500px]">
            <img className="w-full h-full object-cover" src={image} alt="" />
          </div>
        ) : (
          <AddUser
            findFriend={findFriend}
            selectFriend={selectFriend}
            members={members}
            users={users}
          />
        )}
      </CustomModal>
    </>
  );
}
