import { Avatar, Button } from "@mui/material";

import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { CustomMenu } from "../../../../components/common/Menu/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { contactOptions } from "../../../../constants";
import { selectFetching } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";
import { users } from "../../../../mock";

export function ContactList() {
  const fetching = useAppSelector(selectFetching);

  return (
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
  );
}
