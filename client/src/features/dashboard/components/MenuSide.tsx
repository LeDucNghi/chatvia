import "../pages/Dashboard.scss";

import * as React from "react";

import { Button, Divider, Tooltip } from "@mui/material";
import { Language, Sides } from "../../../models";
import {
  onLanguagesChange,
  onModeChange,
  selectLanguage,
  selectMode,
} from "../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";

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
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { languageList } from "../../../constants/clusterWidget";

export interface ISideMenuProps {
  setSide: (side: Sides) => void;
}

export function SideMenu({ setSide }: ISideMenuProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const languages = useAppSelector(selectLanguage);

  const [isSelected, setIsSelected] = React.useState<Sides>("contact");
  const [language, setLanguage] = React.useState<Language>(languages);

  const handleChangeSide = (side: Sides) => {
    setSide(side);
    setIsSelected(side);
  };

  const handleChangeMode = (id: number) => {
    if (id === 7) {
      if (mode === "dark") {
        dispatch(onModeChange("light"));
      } else {
        dispatch(onModeChange("dark"));
      }
    }
  };

  const handleChangeLanguage = (language: Language) => {
    dispatch(onLanguagesChange(language));

    setLanguage(language);
  };

  const handleMenuChange = (values: "profile" | "setting" | "logout") => {
    console.log(
      "🚀 ~ file: MenuSide.tsx:48 ~ handleMenuChange ~ values:",
      values
    );
  };

  return (
    <div className="dashboard-side-menu">
      <div className="side-menu-logo flex-center mb-4">
        <img src={Images.logo2} width={0} height={0} alt="logo" />
      </div>

      <Divider />

      <div className="side-menu-pills mb-4">
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

      <Divider />

      <div className="side-menu-pills">
        {sideMenu.slice(4, 5).map((menu, key) => {
          return (
            <Tooltip
              className="pills-item mx-auto"
              arrow
              key={key}
              title={menu.title}
              placement="left"
              sx={{ color: "#000" }}
            >
              <Button onClick={() => handleChangeMode(menu.id)} variant="text">
                {menu.id === 6 ? (
                  <CustomMenu
                    onChange={handleChangeLanguage}
                    direction="ltr"
                    menuItemStyle={{
                      color: "#7a7f9a",
                    }}
                    isActive={languages === language ? true : false}
                    icon={menu.icon}
                    menu={languageList}
                  />
                ) : mode === "dark" ? (
                  menu.icon
                ) : (
                  <WbSunnyIcon fontSize="small" />
                )}
              </Button>
            </Tooltip>
          );
        })}

        <CustomMenu
          onChange={handleMenuChange}
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
    icon: <LanguageIcon fontSize="small" />,
    title: "Languages",
  },
  {
    id: 6,
    icon: <DarkModeIcon fontSize="small" />,
    title: "Dark / Light mode",
  },
];
