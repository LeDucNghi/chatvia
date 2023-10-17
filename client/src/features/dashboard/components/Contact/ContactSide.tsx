import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { AddContact } from "./AddContact";
import { ContactList } from "./ContactList";
import { IconButton } from "@mui/material";
import { InputField } from "../../../../components/common/InputField/InputField";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "../SideWrapper";
import { handleGetAllUser } from "../../../auth/authThunk";
import { selectMode } from "../../dashboardSlice";
import { selectUserList } from "../../../auth/authSlice";

export interface IContactSideProps {
  friendId: string;
}

export function ContactSide() {
  const dispatch = useAppDispatch();
  const userList = useAppSelector(selectUserList);
  const mode = useAppSelector(selectMode);

  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    dispatch(handleGetAllUser());
  }, [dispatch]);

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value.target.value
    );
  };

  return (
    <SideWrapper
      title="contacts"
      icon={
        <IconButton
          style={{ color: mode === "dark" ? "#93a7cc" : "" }}
          onClick={() => setIsOpen(true)}
        >
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
      <AddContact isOpen={isOpen} setIsOpen={setIsOpen} userList={userList} />

      <ContactList />
    </SideWrapper>
  );
}
