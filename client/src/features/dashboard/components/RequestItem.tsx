import "./Side.scss";

import { Avatar, Button, Card } from "@mui/material";

import { UserProfile } from "../../../models";

export interface IRequestItemProps {
  user: UserProfile;
}

export function RequestItem({ user }: IRequestItemProps) {
  return (
    <Card className="request-wrapper">
      <div className="w-full p-4 flex justify-between items-center">
        <div className="w-20 h-16">
          <Avatar
            sx={{ width: "100%", height: "100%", objectFit: "contain" }}
            src={user.avatar}
            alt="avt"
          />
        </div>

        <div className="w-full px-4 ">
          <div className="w-full py-2 flex justify-between">
            <h5 className="truncate  font-semibold">{user.username}</h5>{" "}
            <h5 className="text-gray-400">11:30pm</h5>
          </div>

          <div className="w-full">
            <Button className="w-2/5" size="small" variant="contained">
              Accept
            </Button>
            <Button
              className="w-2/5"
              size="small"
              sx={{ ml: "1rem" }}
              color="error"
              variant="outlined"
            >
              Deny
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
