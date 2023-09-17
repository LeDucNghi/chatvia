import "../pages/Dashboard.scss";

import * as React from "react";

import { Button, Tooltip } from "@mui/material";

import AccountBoxIcon from "@mui/icons-material/AccountBox";
import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import { CustomMenu } from "../../../components/common/Menu/Menu";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import { Images } from "../../../constants";
import LanguageIcon from "@mui/icons-material/Language";
import LogoutIcon from "@mui/icons-material/Logout";
import MessageIcon from "@mui/icons-material/Message";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Sides } from "../../../models";
import { languages } from "../../../constants/clusterWidget";

export interface ISideMenuProps {
  setSide: (side: Sides) => void;
}

export function SideMenu({ setSide }: ISideMenuProps) {
  const [isSelected, setIsSelected] = React.useState<Sides>("contact");

  const handleChangeSide = (side: Sides) => {
    setSide(side);
    setIsSelected(side);
  };

  return (
    <div className="dashboard-side-menu">
      <div className="side-menu-logo flex-center">
        <img src={Images.logo2} width={0} height={0} alt="logo" />
      </div>

      <div className="side-menu-pills">
        {sideMenu.slice(0, 5).map((menu, key) => {
          return (
            <Tooltip
              className="pills-item mx-auto"
              arrow
              key={key}
              title={menu.title}
              placement="left"
              onClick={() => handleChangeSide(menu.value as Sides)}
              sx={{
                color: isSelected === menu.value ? "#7269ef" : "#000",
              }}
            >
              <Button variant="text">{menu.icon}</Button>
            </Tooltip>
          );
        })}
      </div>

      <div className="side-menu-pills">
        {sideMenu.slice(5, 7).map((menu, key) => {
          return (
            <Tooltip
              className="pills-item mx-auto"
              arrow
              key={key}
              title={menu.title}
              placement="left"
              sx={{ color: "#000" }}
            >
              <Button variant="text">
                <CustomMenu
                  direction="ltr"
                  menuItemStyle={{
                    color: "#7a7f9a",
                  }}
                  icon={menu.icon}
                  menu={languages}
                />
              </Button>
            </Tooltip>
          );
        })}

        <CustomMenu
          direction="ltr"
          menuItemStyle={{
            color: "#7a7f9a",
          }}
          menu={userMenu}
          img={Images.avatar1}
        />
      </div>
    </div>
  );
}

const userMenu = [
  {
    id: 1,
    icon: <AccountBoxIcon fontSize="small" />,
    name: "profile",
  },
  {
    id: 2,
    icon: <SettingsIcon fontSize="small" />,
    name: "setting",
  },
  {
    id: 3,
    icon: <LogoutIcon fontSize="small" />,
    name: "logout",
  },
];

const sideMenu = [
  {
    id: 1,
    icon: <PersonIcon fontSize="small" />,
    title: "Profile",
    value: "profile",
  },
  {
    id: 2,
    icon: <MessageIcon fontSize="small" />,
    title: "Chat",
    value: "chat",
  },
  {
    id: 3,
    icon: <PeopleOutlineIcon fontSize="small" />,
    title: "Group",
    value: "group",
  },
  {
    id: 4,
    icon: <ConnectWithoutContactIcon fontSize="small" />,
    title: "Contacts",
    value: "contact",
  },
  {
    id: 5,
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
    value: "settings",
  },
  {
    id: 6,
    icon: <LanguageIcon fontSize="small" />,
    title: "Languages",
  },
  {
    id: 7,
    icon: <DarkModeIcon fontSize="small" />,
    title: "Dark / Light mode",
  },
];
