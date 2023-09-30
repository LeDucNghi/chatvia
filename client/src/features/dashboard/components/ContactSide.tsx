import * as React from "react";

import { Avatar, Button, CircularProgress, IconButton } from "@mui/material";
import { Images, contactOptions } from "../../../constants";
import { handleGetAllUser, handleSendInvitation } from "../../auth/authThunk";
import { selectUser, selectUserList } from "../../auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { BaseItemLoader } from "../../../components/common/Loader/BaseItemLoader";
import ClearIcon from "@mui/icons-material/Clear";
import { CustomMenu } from "../../../components/common/Menu/Menu";
import CustomModal from "../../../components/common/Modal/Modal";
import { InputField } from "../../../components/common/InputField/InputField";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import NotFound from "../../../components/common/NotFound/NotFound";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import Pusher from "pusher-js";
import { RequestItem } from "./RequestItem";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "./SideWrapper";
import { UserProfile } from "../../../models";
import { selectFetching } from "../dashboardSlice";
import { users } from "../../../mock";

export interface IContactSideProps {
  friendId: string;
}

export function ContactSide() {
  const dispatch = useAppDispatch();

  const fetching = useAppSelector(selectFetching);
  const user = useAppSelector(selectUser);
  const userList = useAppSelector(selectUserList);

  const [isOpen, setIsOpen] = React.useState(false);
  const [fetchingUsersList, setFetchingUsersList] = React.useState(false);
  const [email, setEmail] = React.useState<string | undefined>("");
  const [message, setMessage] = React.useState("");
  const [isSelected, setIsSelected] = React.useState<UserProfile | null>(null);
  let [usersList, setUsersList] = React.useState<UserProfile[]>([]);

  const pusher = new Pusher("bd7b197e7fcf1ef09586", {
    cluster: "ap1",
  });

  const channel = pusher.subscribe("friend-request");

  React.useEffect(() => {
    dispatch(handleGetAllUser());

    channel.bind(`${user?._id}`, (data: UserProfile) => {
      console.log("messages: ", data);

      // dispatch(addNewMessage(data));
    });
  }, []);

  React.useEffect(() => {
    handleFindUser();

    if (!isOpen) {
      setEmail("");
    }
  }, [email, isOpen]);

  const handleFindUser = () => {
    let timer;

    setFetchingUsersList(true);

    const findUser = userList.filter((user) => user.email?.includes(email!));

    clearTimeout(timer);

    timer = setTimeout(() => {
      if (!email) {
        setFetchingUsersList(false);
        setUsersList([]);
      } else {
        setFetchingUsersList(false);

        usersList = findUser;

        setUsersList(usersList);
      }
    }, 1000);
  };

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
  };

  const handleSelectUser = (user: UserProfile) => {
    const index = userList.find((item) => item._id === user._id);

    setEmail(index?.email);
    setIsSelected(user);
  };

  return (
    <SideWrapper
      title="contacts"
      icon={
        <IconButton onClick={() => setIsOpen(true)}>
          <PersonAddIcon />
        </IconButton>
      }
      header={
        <InputField
          onChange={handleFieldChange}
          type="email"
          label="Find users"
          prependIcon={<SearchIcon />}
          autoFocus={false}
        />
      }
    >
      <CustomModal
        styles={{
          width: "31rem",
        }}
        isOpen={isOpen}
        onClose={setIsOpen}
      >
        <div className="modal-header flex justify-between items-center p-4">
          <h5 className="font-semibold capitalize"> add contact </h5>
          <IconButton onClick={() => setIsOpen(false)}>
            <ClearIcon />
          </IconButton>
        </div>

        <div className="modal-body p-6">
          <InputField
            value={email}
            className="mb-4"
            autoFocus={false}
            type="email"
            label="Enter Email"
            name="email"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(e.target.value)
            }
          />

          <InputField
            className="mb-4"
            autoFocus={false}
            value={message}
            type="text"
            label="Enter Message"
            name="message"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setMessage(e.target.value)
            }
          />

          {fetchingUsersList ? (
            <div className="w-full flex justify-center">
              <CircularProgress />
            </div>
          ) : usersList.length === 0 ? (
            <NotFound
              icon={Images.noresult}
              title="Please enter your friend email 🤔"
            />
          ) : (
            <div className="w-full h-[110px] overflow-auto">
              {usersList.map((user, key) => {
                return (
                  <RequestItem
                    key={key}
                    user={user}
                    status="send"
                    onClick={handleSelectUser}
                  />
                );
              })}
            </div>
          )}

          <div className="moda-footer p-3 w-full flex justify-end">
            <Button
              sx={{
                background: "#7269ef",
                textTransform: "capitalize",
                padding: "0.5rem 1rem",
              }}
              onClick={() => dispatch(handleSendInvitation(isSelected!._id!))}
              type="button"
              variant="contained"
              disabled={!email}
            >
              add this contact
            </Button>
          </div>
        </div>
      </CustomModal>

      <div className="contacts w-full h-[500px] overflow-auto">
        <div className="contact-item">
          <div className="p-3 uppercase font-semibold">a</div>

          <ul className="capitalize">
            {fetching.isConversation ? (
              <BaseItemLoader listToRender={5} />
            ) : (
              users.map((user, key) => {
                return (
                  <li key={key} className=" p-3 w-full flex justify-between">
                    <Button className="w-full">
                      <div className="flex items-center justify-start w-full">
                        <Avatar src={user.avatar} />

                        <h5 className="ml-2 text-black font-semibold capitalize">
                          {user.username}
                        </h5>
                      </div>
                    </Button>

                    <CustomMenu
                      icon={<MoreVertIcon />}
                      direction="rtl"
                      menu={contactOptions}
                      menuItemStyle={{
                        color: "#7a7f9a",
                      }}
                    />
                  </li>
                );
              })
            )}
          </ul>
        </div>
      </div>
    </SideWrapper>
  );
}
