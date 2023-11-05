import "../../pages/Dashboard.scss";

import * as React from "react";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import {
  onOpenConversation,
  selectMode,
  selectOpenConversation,
} from "../../dashboardSlice";
import { styled, useTheme } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../../../../app/store";

import { BREAK_POINTS_NUMBER } from "../../../../constants";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Conversation } from "./Conversation";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import { Header } from "./Header";
import IconButton from "@mui/material/IconButton";
import { Section } from "./Section";
import { Settings } from "./Settings";
import Toolbar from "@mui/material/Toolbar";
import { useWindowSize } from "../../../../hooks/useWindow";

const drawerWidth = 280;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(1.5),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  /**
   * This is necessary to enable the selection of content. In the DOM, the stacking order is determined
   * by the order of appearance. Following this rule, elements appearing later in the markup will overlay
   * those that appear earlier. Since the Drawer comes after the Main content, this adjustment ensures
   * proper interaction with the underlying content.
   */
  position: "relative",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  width: "70%",
  ...(open && {
    width: `calc(70% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export function ConversationMain() {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const mode = useAppSelector(selectMode);
  const openConversation = useAppSelector(selectOpenConversation);
  const { windowInnerWidth } = useWindowSize();

  const [open, setOpen] = React.useState(false);

  //   const handleDrawerOpen = () => {
  //     setOpen(true);
  //   };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ display: "flex" }}>
      <AppBar
        sx={{ background: "transparent" }}
        className={`${openConversation ? "active" : ""} appbar`}
        open={open}
      >
        <Toolbar>
          {windowInnerWidth < BREAK_POINTS_NUMBER.md && (
            <IconButton
              sx={{ color: mode === "dark" ? "#fff" : "" }}
              onClick={() => dispatch(onOpenConversation(false))}
            >
              <ChevronLeftIcon />
            </IconButton>
          )}
          <Header openDrawer={setOpen} />
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <Conversation />
        <Section partnerId="" />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />

        <Settings />
      </Drawer>
    </div>
  );
}
