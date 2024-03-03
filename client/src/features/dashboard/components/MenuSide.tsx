import "../pages/Dashboard.scss";

import * as React from "react";

import {
  BREAK_POINTS_NUMBER,
  languageList,
  sideMenu,
  userMenu,
} from "../../../constants/";
import { Badge, Button, Divider, Icon, Tooltip } from "@mui/material";
import { Language, Notify, Sides } from "../../../models";
import {
  onLanguagesChange,
  onModeChange,
  selectFriendRequest,
  selectLanguage,
  selectMode,
  selectNotify
} from "../dashboardSlice";
import { useAppDispatch, useAppSelector } from "../../../app/store";

import { CustomMenu } from "../../../components/common/Menu/Menu";
import { Images } from "../../../constants";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { cookies } from "../../../utils";
import { handleUpdateSettings } from "../dashboardThunk";
import { selectUser } from "../../auth/authSlice";
import { useTranslation } from "react-i18next";
import { useWindowSize } from "../../../hooks/useWindow";

export interface ISideMenuProps {
  setSide: (side: Sides) => void;
}

export function SideMenu({ setSide }: ISideMenuProps) {
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const languages = useAppSelector(selectLanguage);
  const notifications = useAppSelector(selectNotify)
  const friendRequest = useAppSelector(selectFriendRequest)
  const user = useAppSelector(selectUser)
  const { i18n, t } = useTranslation();
  const { windowInnerWidth } = useWindowSize();

  const [isSelected, setIsSelected] = React.useState<Sides>("chat");
  const [language, setLanguage] = React.useState<Language>(languages);
  const [notifyType, setNotifyType] = React.useState<Notify | null>(null);
  const [newMsg, setNewMsg] = React.useState<number[]>([]);

  React.useEffect(() => {
    notifications.map((noti) => {
      if (noti.type === "friendRequest") {
        // const req = [...friendRequest, 1]

        setNotifyType("friendRequest")
        // setFriendRequest(req)
      }
      else if (noti.type === "missedCall") {
        setNotifyType("missedCall")
      }
      else {
        const req = [...newMsg, 1]

        setNotifyType("newMsg")
        setNewMsg(req)
      }
    })
  }, [notifications]);


  const handleChangeSide = (side: Sides) => {
    setSide(side);
    setIsSelected(side);
  };

  const handleChangeMode = () => {
    if (mode === "dark") {
      dispatch(onModeChange("light"));
      dispatch(handleUpdateSettings("light", language));
    } else {
      dispatch(onModeChange("dark"));
      dispatch(handleUpdateSettings("dark", language));
    }
  };

  const handleChangeLanguage = (language: Language) => {
    if (typeof language !== "string") {
      return
    } else {
      i18n.changeLanguage(language);
      dispatch(onLanguagesChange(language));
      dispatch(handleUpdateSettings(mode, language));

      setLanguage(language);
    }
  };

  const handleMenuChange = (values: "profile" | "setting" | "logout") => {
    if (values === "logout") {
      cookies.removeCookie("user");

      window.location.href = "/";
    }
  };

  return (
    <div className={`dashboard-side-menu ${mode === "dark" ? "dark" : ""}`}>
      {windowInnerWidth > BREAK_POINTS_NUMBER.md && (
        <div className="side-menu-logo flex-center mb-2">
          <img src={Images.logo2} width={0} height={0} alt="logo" />
        </div>
      )}

      <Divider
        sx={{ background: mode === "dark" ? "#a6b0cf" : "", mb: "0.5rem" }}
      />

      <div className="side-menu-pills w-full flex flex-col ">
        {sideMenu.slice(0, 6).map((menu, key) => {
          return (
            <Tooltip
              className="pills-item w-8 h-12 mx-auto"
              arrow
              key={key}
              title={t(menu.title)}
              placement={
                windowInnerWidth < BREAK_POINTS_NUMBER.md ? "top" : "left"
              }
              onClick={() => handleChangeSide(menu.value as Sides)}
              sx={{
                color:
                  isSelected === menu.value
                    ? "#7269ef"
                    : mode === "dark"
                      ? "#a6b0cf"
                      : "#000",
              }}
            >
              <Button variant="text">
                {menu.id !== 2 && menu.id !== 4 && menu.id !== 5 ? (
                  <Icon>{menu.icon}</Icon>
                ) : (
                  <Badge color="error" badgeContent={
                    menu.id === 5 ? notifications.length
                      : menu.id === 4
                        ? friendRequest.length
                        : menu.id === 2 && notifyType === "newMsg"
                          ? newMsg.length : 0
                  }>
                    <Icon>{menu.icon}</Icon>
                  </Badge>
                )}
              </Button>
            </Tooltip>
          );
        })}

        {windowInnerWidth < BREAK_POINTS_NUMBER.md && (
          <CustomMenu
            onChange={handleMenuChange}
            direction="ltr"
            menuItemStyle={{
              color: "#7a7f9a",
            }}
            menu={userMenu}
            img={Images.avatar1}
          />
        )}
      </div>

      <Divider
        sx={{ background: mode === "dark" ? "#a6b0cf" : "", mb: "0.5rem" }}
      />

      {windowInnerWidth > BREAK_POINTS_NUMBER.md && (
        <div className="side-menu-pills w-full flex flex-col ">
          {sideMenu.slice(6, 8).map((menu, key) => {
            return (
              <Tooltip
                className="pills-item w-8 h-12 mx-auto"
                arrow
                key={key}
                title={t(menu.title)}
                placement={
                  windowInnerWidth < BREAK_POINTS_NUMBER.md ? "top" : "left"
                }
                sx={{ color: mode === "dark" ? "#a6b0cf" : "#000" }}

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
                  ) :
                    <>
                      {mode === "dark"
                        ? <Icon onClick={handleChangeMode}>{menu.icon}</Icon>
                        : <WbSunnyIcon onClick={handleChangeMode} fontSize="small" />}
                    </>}
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
            img={user && user.avatar ? user.avatar : Images.user}
          />
        </div>
      )}
    </div>
  );
}
