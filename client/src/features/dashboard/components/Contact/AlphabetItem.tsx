import { Avatar, Button } from "@mui/material";
import { EditContactType, UserProfile } from "../../../../models";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { CustomMenu } from "../../../../components/common/Menu/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { contactOptions } from "../../../../constants";
import { handleEditContact } from "../../dashboardThunk";
import { selectMode } from "../../dashboardSlice";
import { useState } from "react";

export interface IAlphabetItemProps {
  itemsByLetter: UserProfile;
  userList: UserProfile[];
}

export function AlphabetItem({ itemsByLetter, userList }: IAlphabetItemProps) {
  const mode = useAppSelector(selectMode);
  const dispatch = useAppDispatch();

  const [id, setId] = useState<string>("");

  const alphabet = Object.keys(itemsByLetter).sort();

  const editContact = (value: string) => {
    dispatch(handleEditContact(id, value as EditContactType));
  };

  return (
    <>
      {userList.length !== 0
        ? userList.map((user, key) => {
            return (
              <div key={key} className=" p-3 w-full flex justify-between">
                <Button className="w-full">
                  <div className="flex items-center justify-start w-full">
                    <Avatar src={user.avatar} />

                    <h5
                      className={`ml-2 ${
                        mode === "dark" ? "text-white" : "text-black"
                      } font-semibold capitalize`}
                    >
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
                  onChange={(value: string) => {
                    setId(user._id!);
                    editContact(value);
                  }}
                />
              </div>
            );
          })
        : alphabet.map((letter) => {
            return (
              <div key={letter}>
                {" "}
                <div
                  className={`p-3 uppercase font-semibold ${
                    mode === "dark" ? "text-blue-600" : ""
                  }`}
                >
                  {" "}
                  {letter}{" "}
                </div>
                <ul className="capitalize">
                  {itemsByLetter[letter].map((user, index) => {
                    return (
                      <li
                        key={index}
                        className=" p-3 w-full flex justify-between"
                      >
                        <Button className="w-full">
                          <div className="flex items-center justify-start w-full">
                            <Avatar src={user.avatar} />

                            <h5
                              className={`ml-2 ${
                                mode === "dark" ? "text-white" : "text-black"
                              } font-semibold capitalize`}
                            >
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
                          onChange={(value: string) => {
                            setId(user._id);
                            editContact(value);
                          }}
                        />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
    </>
  );
}
