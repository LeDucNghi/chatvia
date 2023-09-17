import * as React from "react";

import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import { Dropdown } from "../../../models";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

export interface IMenuProps {
  menu: Dropdown[];

  img?: string;

  direction: "rtl" | "ltr";

  icon?: React.ReactNode;
  menuItemStyle?: React.CSSProperties;
}

export function CustomMenu({
  menu,
  img,
  icon,
  direction,
  menuItemStyle,
}: IMenuProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <IconButton
          onClick={handleClick}
          size="small"
          sx={{ margin: "0 auto" }}
          aria-controls={open ? "account-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
        >
          {icon ? (
            icon
          ) : img ? (
            <Avatar sx={{ width: 32, height: 32 }} src={img} />
          ) : null}
        </IconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: direction === "ltr" ? 0 : 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before":
              direction === "rtl"
                ? {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  }
                : {},
          },
        }}
        transformOrigin={{
          horizontal: direction === "rtl" ? "right" : "left",
          vertical: direction === "rtl" ? "top" : "bottom",
        }}
        anchorOrigin={{
          horizontal: direction === "rtl" ? "right" : "left",
          vertical: direction === "rtl" ? "bottom" : "top",
        }}
      >
        {menu.map((item, key) => {
          return (
            <MenuItem style={menuItemStyle} key={key} onClick={handleClose}>
              <div className="w-full h-full p-2 text-base capitalize font-medium flex justify-between">
                {item.img && (
                  <div className="img mr-4">
                    {" "}
                    <img
                      className="w-4 h-4 object-contain"
                      src={item.img}
                      alt=""
                    />{" "}
                  </div>
                )}
                <p className="text-left">{item.name}</p>{" "}
                <div className="icon ml-4">{item.icon}</div>
              </div>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
}
