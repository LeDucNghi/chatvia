import { Avatar, Button } from "@mui/material";
import { selectFetching, selectMode } from "../../dashboardSlice";

import { Badge } from "../../../../components/common/Badge/Badge";
import { BaseItemLoader } from "../../../../components/common/Loader/BaseItemLoader";
import { useAppSelector } from "../../../../app/store";
import { users } from "../../../../mock";

export function GroupList () {
  const fetching = useAppSelector(selectFetching);
  const mode = useAppSelector(selectMode);

  return (
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

                <h5
                  className={`text-left text-sm ${
                    mode === "dark" ? "text-white" : "text-black"
                  } w-9/12 font-semibold ml-2`}
                >
                  #{group.username}
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
