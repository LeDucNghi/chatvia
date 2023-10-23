import "../Side.scss";

import * as React from "react";

import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { CreateGroup } from "./CreateGroup";
import { GroupList } from "./GroupList";
import { IconButton } from "@mui/material";
import { InputField } from "../../../../components/common/InputField/InputField";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "../SideWrapper";
import { handleGetAllUser } from "../../../auth/authThunk";
import { selectMode } from "../../dashboardSlice";

export function GroupSide() {
  const mode = useAppSelector(selectMode);

  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = React.useState(false);

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
  };

  React.useEffect(() => {
    dispatch(handleGetAllUser());
  }, [dispatch]);

  return (
    <SideWrapper
      title="groups"
      icon={
        <IconButton
          style={{ color: mode === "dark" ? "#93a7cc" : "" }}
          onClick={() => setIsOpen(true)}
        >
          <PeopleOutlineIcon />
        </IconButton>
      }
      header={
        <InputField
          onChange={handleFieldChange}
          type="email"
          label="Find groups"
          prependIcon={<SearchIcon />}
          autoFocus={false}
        />
      }
    >
      <GroupList />

      <CreateGroup isOpen={isOpen} setIsOpen={setIsOpen} />
    </SideWrapper>
  );
}
