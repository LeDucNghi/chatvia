import * as React from "react";

import { AddContact } from "./AddContact";
import { ContactList } from "./ContactList";
import { IconButton } from "@mui/material";
import { InputField } from "../../../../components/common/InputField/InputField";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "../SideWrapper";
import { selectUserList } from "../../../auth/authSlice";
import { useAppSelector } from "../../../../app/store";

export interface IContactSideProps {
  friendId: string;
}

export function ContactSide() {
  const userList = useAppSelector(selectUserList);

  const [isOpen, setIsOpen] = React.useState(false);

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
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
      <AddContact isOpen={isOpen} setIsOpen={setIsOpen} userList={userList} />

      <ContactList />
    </SideWrapper>
  );
}
