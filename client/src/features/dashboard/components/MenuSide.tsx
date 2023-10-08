import "../pages/Dashboard.scss";

import * as React from "react";

import { Badge, Button, Divider, Icon, Tooltip } from "@mui/material";
import { Language, Sides } from "../../../models";
import { languageList, sideMenu, userMenu } from "../../../constants/";
import {
  onLanguagesChange,
  onModeChange,
  selectFriendRequest,
  selectLanguage,
  selectMode,
} from "../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { CustomMenu } from "../../../components/common/Menu/Menu";
import { Images } from "../../../constants";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { cookies } from "../../../utils";

export interface ISideMenuProps {
  setSide: (side: Sides) => void;
}

export function SideMenu({ setSide }: ISideMenuProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const languages = useAppSelector(selectLanguage);
  const friendRequest = useAppSelector(selectFriendRequest);

  const [isSelected, setIsSelected] = React.useState<Sides>("chat");
  const [language, setLanguage] = React.useState<Language>(languages);

  const handleChangeSide = (side: Sides) => {
    setSide(side);
    setIsSelected(side);
  };

  const handleChangeMode = (id: number) => {
    if (id === 8) {
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
    if (values === "logout") {
      cookies.removeCookie("user");

      window.location.href = "/";
    }
  };

  return (
    <div className="dashboard-side-menu">
      <div className="side-menu-logo flex-center mb-2">
        <img src={Images.logo2} width={0} height={0} alt="logo" />
      </div>

      <Divider />

      <div className="side-menu-pills w-full flex flex-col ">
        {sideMenu.slice(0, 6).map((menu, key) => {
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
              <Button variant="text">
                {menu.id !== 2 && menu.id !== 4 && menu.id !== 5 ? (
                  <Icon>{menu.icon}</Icon>
                ) : (
                  <Badge color="error" badgeContent={friendRequest.length}>
                    <Icon>{menu.icon}</Icon>
                  </Badge>
                )}
              </Button>
            </Tooltip>
          );
        })}
      </div>

      <Divider />

      <div className="side-menu-pills w-full flex flex-col">
        {sideMenu.slice(6, 8).map((menu, key) => {
          return (
            <Tooltip
              className="pills-item mx-auto"
              arrow
              key={key}
              title={menu.title}
              placement="left"
              sx={{ color: "#000" }}
              onClick={() => handleChangeMode(menu.id)}
            >
              <Button variant="text">
                {menu.id === 7 ? (
                  <CustomMenu
                    onChange={handleChangeLanguage}
                    direction="ltr"
                    menuItemStyle={{
                      background: "#fff",
                    }}
                    isActive={languages === language ? true : false}
                    icon={menu.icon}
                    menu={languageList}
                  />
                ) : mode === "dark" ? (
                  <Icon>{menu.icon}</Icon>
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
