import * as React from "react";

import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  IconButton,
  Paper,
  TextField,
} from "@mui/material";
import { selectConversations, selectGroupInfo } from "../../dashboardSlice";

import ClearIcon from "@mui/icons-material/Clear";
import CustomModal from "../../../../components/common/Modal/Modal";
import { Images } from "../../../../constants";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { UserProfile } from "../../../../models";
import { images } from "../../../../mock";
import { selectUser } from "../../../auth/authSlice";
import { useAppSelector } from "../../../../app/store";

export interface ISettingsModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;

  type: "addUser" | "members" | "images";
}

export function SettingsModal({ open, setOpen, type }: ISettingsModalProps) {
  const groupInfo = useAppSelector(selectGroupInfo);
  const conversation = useAppSelector(selectConversations);
  const user = useAppSelector(selectUser);

  const [users, setUsers] = React.useState<UserProfile[]>([]);
  const [members, setMembers] = React.useState<UserProfile[]>([]);

  React.useEffect(() => {
    groupInfo?.members.forEach((item) => {
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
          {type === "images"
            ? "Media, Files & Links"
            : type === "members"
            ? `${groupInfo?.members.length} members`
            : "Add user"}
        </h2>

        <IconButton
          sx={{ position: "absolute", top: "0.5rem", right: "1rem" }}
          onClick={() => setOpen(!open)}
        >
          <ClearIcon />
        </IconButton>

        {type === "members" ? (
          <div>
            <div className="w-full h-[300px] overflow-auto px-10 text-white">
              {conversation?.participant.map((member, key) => {
                return (
                  <div
                    className="flex justify-between items-center py-3"
                    key={key}
                  >
                    <div className="w-12 h-10">
                      <img
                        className="w-full h-full object-cover rounded-full"
                        src={member.avatar ? member.avatar : Images.avatar1}
                        alt={member.username}
                      />
                    </div>

                    <p className="w-full px-3"> {member.username} </p>

                    <IconButton>
                      <MoreHorizIcon />
                    </IconButton>

                    <Divider />
                  </div>
                );
              })}
            </div>

            <Button className="w-full" color="info" variant="contained">
              Add User
            </Button>
          </div>
        ) : type === "images" ? (
          <div className="flex flex-wrap px-4 h-[300px] overflow-auto">
            {images.map((img, key) => {
              return (
                <div key={key} className="w-28 h-28 mb-4 p-2 cursor-pointer">
                  <img
                    className="w-full h-full object-contain rounded-xl"
                    src={img.image}
                    alt=""
                  />
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-4">
            <TextField
              placeholder="Nguyen Van A..."
              label="Search User"
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                findFriend(e)
              }
            />

            <div className="flex">
              {users?.length !== 0 &&
                users?.map((item, key) => {
                  return (
                    <div
                      key={key}
                      className="flex items-center flex-col p-4 relative"
                    >
                      <IconButton
                        sx={{
                          position: "absolute",
                          width: "1.2rem",
                          height: "1.2rem",
                          right: "2.2rem",
                          top: "0.6rem",
                          background: "#fff",

                          ":hover": {
                            background: "#fff",
                          },
                        }}
                        onClick={() => selectFriend(item)}
                      >
                        <ClearIcon fontSize="small" />
                      </IconButton>

                      <div className="w-12 h-12">
                        <img
                          className="h-full w-full object-cover rounded-full"
                          src={item.avatar}
                          alt=""
                        />
                      </div>
                      <p className="w-1/2 truncate">{item.username}</p>
                    </div>
                  );
                })}
            </div>

            <div className="h-[300px] overflow-auto">
              {members.map((friend, key) => {
                return (
                  <Paper
                    elevation={5}
                    sx={{ backgroundColor: "transparent", margin: "0.5rem 0" }}
                    key={key}
                  >
                    <FormControlLabel
                      value="start"
                      control={<Checkbox sx={{ ml: "15rem" }} />}
                      sx={{ color: "#fff", py: "0.5rem" }}
                      label={
                        <div className="flex justify-between items-center py-3">
                          <div className="w-12 h-10">
                            <img
                              className="w-full h-full object-cover rounded-full"
                              src={
                                friend.avatar ? friend.avatar : Images.avatar1
                              }
                              alt={friend.username}
                            />
                          </div>

                          <p className="w-full px-3"> {friend.username} </p>
                        </div>
                      }
                      labelPlacement="start"
                      onChange={() => selectFriend(friend)}
                    />

                    <Divider />
                  </Paper>
                );
              })}
            </div>

            <Button className="w-full" color="info" variant="contained">
              Add User
            </Button>
          </div>
        )}
      </CustomModal>
    </>
  );
}
