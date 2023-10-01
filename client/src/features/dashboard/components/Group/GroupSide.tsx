import "../Side.scss";

import * as React from "react";

import { Avatar, Button } from "@mui/material";

import { Badge } from "../../../../components/common/Badge/Badge";
import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { InputField } from "../../../../components/common/InputField/InputField";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import SearchIcon from "@mui/icons-material/Search";
import { SideWrapper } from "../SideWrapper";
import { selectFetching } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";
import { users } from "../../../../mock";

export function GroupSide() {
  const fetching = useAppSelector(selectFetching);

  const handleFieldChange = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(
      "🚀 ~ file: ChatSide.tsx:12 ~ handleFieldChange ~ value:",
      value
    );
  };

  return (
    <SideWrapper
      title="Groups"
      icon={<PeopleOutlineIcon />}
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
      <div className="group-wrapper w-full h-[500px] overflow-auto ">
        {fetching.isConversation ? (
          <BaseItemLoader listToRender={5} />
        ) : (
          users.map((group, key) => {
            return (
              <Button
                sx={{ padding: "1rem" }}
                className="w-full group-items"
                key={key}
              >
                <div className="w-full flex justify-between items-center">
                  <Avatar src={group.avatar} alt={group.username} />

                  <h5 className="text-left text-sm text-black w-9/12 font-semibold ml-2">
                    #{group.username}
                  </h5>

                  <Badge content={10} />
                </div>
              </Button>
            );
          })
        )}
      </div>
    </SideWrapper>
  );
}