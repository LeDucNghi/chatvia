import { Avatar, Button } from "@mui/material";
import { selectFetching, selectMode } from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { Badge } from "../../../../components/common/Badge/Badge";
import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { Conversation } from "../../../../models";
import { Images } from "../../../../constants";
import { fetchConversation } from "../../dashboardThunk";

export interface GroupListProps {
  groupList: Conversation[];
}

export function GroupList({ groupList }: GroupListProps) {
  const fetching = useAppSelector(selectFetching);
  const mode = useAppSelector(selectMode);

  const dispatch = useAppDispatch();

  const getGroupConversation = (participant: Conversation) => {
    dispatch(
      fetchConversation(
        true,
        participant.participant.map((user) => user._id!)
      )
    );
  };

  return (
    <div className="group-wrapper w-full h-[500px] overflow-auto ">
      {fetching.isConversation ? (
        <BaseItemLoader listToRender={5} />
      ) : (
        groupList.map((group, key) => {
          return (
            <Button
              sx={{ padding: "1rem" }}
              className="w-full group-items"
              key={key}
              onClick={() => getGroupConversation(group)}
            >
              <div className="w-full flex justify-between items-center">
                <Avatar src={Images.avatar1} alt={group.groupName} />

                <h5
                  className={`text-left text-sm ${
                    mode === "dark" ? "text-white" : "text-black"
                  } w-9/12 font-semibold ml-2`}
                >
                  #{group.groupName}
                </h5>

                <Badge content={10} />
              </div>
            </Button>
          );
        })
      )}
    </div>
  );
}
