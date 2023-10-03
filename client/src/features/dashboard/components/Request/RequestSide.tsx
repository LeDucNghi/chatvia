import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { RequestItem } from "./RequestItem";
import { SideWrapper } from "../SideWrapper";
import { selectFriendRequest } from "../../dashboardSlice";
import { useAppSelector } from "../../../../app/store";

export function RequestSide() {
  const friendRequest = useAppSelector(selectFriendRequest);

  return (
    <SideWrapper title="friend request" icon={<GroupAddIcon />}>
      <div className="h-[600px] overflow-auto">
        {friendRequest.map((req, key) => {
          return (
            <RequestItem
              requestId={req._id}
              status="receive"
              user={req.sender}
              key={key}
            />
          );
        })}
      </div>
    </SideWrapper>
  );
}
