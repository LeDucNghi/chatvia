import "@/components/layouts/Dashboard/Dashboard.scss";

import * as React from "react";

import { Button, Tooltip } from "@mui/material";

import ConnectWithoutContactIcon from "@mui/icons-material/ConnectWithoutContact";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import Image from "next/image";
import { Images } from "@/constants";
import LanguageIcon from "@mui/icons-material/Language";
import MessageIcon from "@mui/icons-material/Message";
import PeopleOutlineIcon from "@mui/icons-material/PeopleOutline";
import PersonIcon from "@mui/icons-material/Person";
import SettingsIcon from "@mui/icons-material/Settings";
import { Sides } from "@/models";

export interface ISideMenuProps {
  setSide: (side: Sides) => void;
}

export function SideMenu({ setSide }: ISideMenuProps) {
  const handleChangeSide = (side: Sides) => {
    setSide(side);
  };

  return (
    <div className="dashboard-side-menu">
      <div className="side-menu-logo flex-center">
        <Image src={Images.logo2} width={0} height={0} alt="logo" />
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
              sx={{ color: "#000" }}
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
              <Button variant="text">{menu.icon}</Button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}

const sideMenu = [
  {
    id: 1,
    icon: <PersonIcon fontSize="small" />,
    title: "Profile",
  },
  {
    id: 2,
    icon: <MessageIcon fontSize="small" />,
    title: "Chat",
  },
  {
    id: 3,
    icon: <PeopleOutlineIcon fontSize="small" />,
    title: "Group",
  },
  {
    id: 4,
    icon: <ConnectWithoutContactIcon fontSize="small" />,
    title: "Contacts",
  },
  {
    id: 5,
    icon: <SettingsIcon fontSize="small" />,
    title: "Settings",
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
