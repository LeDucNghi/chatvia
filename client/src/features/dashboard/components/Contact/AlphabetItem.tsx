import { Avatar, Button } from "@mui/material";

import { CustomMenu } from "../../../../components/common/Menu/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { UserProfile } from "../../../../models";
import { contactOptions } from "../../../../constants";

export interface IAlphabetItemProps {
  itemsByLetter: UserProfile;
}

export function AlphabetItem({ itemsByLetter }: IAlphabetItemProps) {
  const alphabet = Object.keys(itemsByLetter).sort();

  return (
    <>
      {alphabet.map((letter) => {
        return (
          <div key={letter}>
            {" "}
            <div className="p-3 uppercase font-semibold"> {letter} </div>
            <ul className="capitalize">
              {itemsByLetter[letter].map((user, index) => {
                return (
                  <li key={index} className=" p-3 w-full flex justify-between">
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
              })}
            </ul>
          </div>
        );
      })}
    </>
  );
}
