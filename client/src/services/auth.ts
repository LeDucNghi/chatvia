import { UserProfile } from "../models/auth";
import { axiosClient } from "./axiosClient";

export const authService = {
  signin(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/signin", params);
  },

  signup(params: UserProfile): Promise<UserProfile> {
    return axiosClient.post("/auth/signup", params);
  },

  getUser(): Promise<UserProfile> {
    return axiosClient.post("/auth/getUser");
  },
};
