import { Dropdown } from "../models";
import { Images } from "./images";

export const languageList: Dropdown[] = [
  {
    id: 1,
    name: "vietnamese",
    img: Images.vietnam,
  },
  {
    id: 2,
    name: "english",
    img: Images.usa,
  },
];

export const userMenu: Dropdown[] = [
  {
    id: 1,
    icon: "account_box",
    name: "profile",
  },
  {
    id: 2,
    icon: "settings",
    name: "setting",
  },
  {
    id: 3,
    icon: "logout",
    name: "logout",
  },
];

export const sideMenu = [
  {
    id: 1,
    icon: "person",
    title: "Profile",
    value: "profile",
  },
  {
    id: 2,
    icon: "message",
    title: "Chat",
    value: "chat",
  },
  {
    id: 3,
    icon: "peopleoutline",
    title: "Group",
    value: "group",
  },
  {
    id: 4,
    icon: "phone",
    title: "Contacts",
    value: "contact",
  },

  {
    id: 5,
    icon: "language",
    title: "Languages",
  },
  {
    id: 6,
    icon: "nightlight",
    title: "Dark / Light mode",
  },
];

export const profileMenu: Dropdown[] = [
  {
    id: 1,
    name: "Edit",
    icon: "modeedit",
  },
];

export const contactOptions: Dropdown[] = [
  {
    id: 1,
    name: "share",
    icon: "share",
  },
  {
    id: 2,
    name: "block",
    icon: "block",
  },
  {
    id: 3,
    name: "remove",
    icon: "deleteoutline",
  },
];
