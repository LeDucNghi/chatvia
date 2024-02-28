import { Avatar, Button } from "@mui/material";
import {
  fetchPartnerProfileSuccess,
  onBlockedStatusChange,
  onOpenConversation,
  selectFetching,
  selectMode,
} from "../../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { Badge } from "../../../../components/common/Badge/Badge";
import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { Conversation } from "../../../../models";
import { Images } from "../../../../constants";
import NotFound from "../../../../components/common/NotFound/NotFound";
import { fetchConversation } from "../../dashboardThunk";

export interface GroupListProps {
  groupList: Conversation[];
}

export function GroupList({ groupList }: GroupListProps) {
  console.log("🚀 ~ GroupList ~ groupList:", groupList)
  const fetching = useAppSelector(selectFetching);
  const mode = useAppSelector(selectMode);

  const dispatch = useAppDispatch();

  const getGroupConversation = (id: string) => {
    dispatch(
      fetchConversation(
        id
      )
    );

    dispatch(onBlockedStatusChange("unBlocked"));
    dispatch(fetchPartnerProfileSuccess(null));
    dispatch(onOpenConversation(true));

  };

  return (
    <div className="group-wrapper w-full h-[500px] overflow-auto ">
      {fetching.isConversation ? (
        <BaseItemLoader listToRender={5} />
      ) : groupList.length === 0 ? (
        <NotFound
          title="You haven't joined any group yet🤔"
          icon={Images.groups}
        />
      ) : (
        groupList.map((group, key) => {
          return (
            <Button
              sx={{ padding: "1rem" }}
              className="w-full group-items"
              key={key}
              onClick={() => getGroupConversation(group._id)}
            >
              <div className="w-full flex justify-between items-center">
                <Avatar src={Images.avatar1} alt={group.groupName} />

                <h5
                  className={`text-left text-sm ${mode === "dark" ? "text-white" : "text-black"
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
