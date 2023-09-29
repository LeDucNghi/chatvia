import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { RequestItem } from "./RequestItem";
import { SideWrapper } from "./SideWrapper";
import { friendRequests } from "../../../mock";

export function RequestSide() {
  return (
    <SideWrapper title="friend request" icon={<GroupAddIcon />}>
      <div className="h-[600px] overflow-auto">
        {friendRequests.map((req, key) => {
          return <RequestItem user={req} key={key} />;
        })}
      </div>
    </SideWrapper>
  );
}
